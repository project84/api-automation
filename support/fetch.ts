import { FetchOptions, RequestOptions, Headers, FetchResponse } from '@models/support/fetch';
import { getPath } from '@support/paths';
import { getAbsPath } from '@support/files';

import * as fs from 'fs';
import { Context } from 'mocha';

const fetch = require('node-fetch');
const FormData = require('form-data');
const URLSearchParams = require('@ungap/url-search-params');
const addContext = require('mochawesome/addContext');

export async function request(mocha: Context, options: FetchOptions) {

	const resource: string = options.resolvedPath || getPath(options.path.app, options.path.service, options.path.alias, options.path.options);

	const requestOptions: RequestOptions = constructRequestOptions(options);

	addContext(mocha, { title: 'API request', value: requestOptions.method + ' ' + resource });

	let res = await fetch(resource, requestOptions);

	let output: FetchResponse = {
		method: requestOptions.method,
		app: options.path.app,
		service: options.path.service,
		resource: resource,
		headers: JSON.parse(JSON.stringify(res.headers.raw())),
		status: res.status,
		statusText: res.statusText,
		body: await convertResponseBody(res)
	};

	addContext(mocha, { title: `${output.status} (${output.statusText})`, value: output.status >= 400 ? output.body : '' });

	return output;
}

function constructRequestOptions(options: FetchOptions): RequestOptions {
	let requestOptions: RequestOptions = { method: options.method.toUpperCase() };

	// Determine appropriate headers for the request
	requestOptions.headers = setHeaders(options);

	// Determine appropriate request body
	requestOptions.body = setBody(options);

	return requestOptions;

}

function setHeaders(options: FetchOptions): Headers {
	let headers = options.headers || {};

	if (options.body) {
		// Content type is set to application/json if JSON object is supplied as the request body
		headers['Content-Type'] = 'application/json';
	} else if (options.form) {
		// Content type is set to application/x-www-form-urlencoded if a form is supplied.
		headers['Content-Type'] = 'application/x-www-form-urlencoded';
	}

	return headers;
}

function setBody(options: FetchOptions) {

	let body;

	if (options.body) {
		// If a JSON object is supplied as the body, the stringified version is set as the request body
		body = JSON.stringify(options.body);
	} else if (options.filePath) {
		// If a file path is supplied, the file is added as the request body to allow it to be uploaded
		let data = new FormData();
		let file = fs.readFileSync(getAbsPath(options.filePath));
		let fileName = options.filePath.slice(options.filePath.lastIndexOf('/'));

		data.append('file', file, {
			filename: fileName,
		});

		body = data;
	} else if (options.form) {
		// If URL unencoded form data is supplied, it is parsed correctly for the request body
		let form = new URLSearchParams();

		Object.keys(options.form).forEach(key => {
			form.set(key, options.form[key]);
		});

		body = form;
	}

	return body;

}

async function convertResponseBody(res) {
	// Retrieve response content type and body as text
	let contentType = res.headers.get('content-type') || '';
	let body = await res.text();

	if (body.length === 0) {
		// If there is no content in the body, return null to avoid displaying an empty string as the response body in the report
		return null;
	} else if (contentType.includes('application/json')) {
		// If the content type indicates the response body is a JSON, return it parsed as a JSON object
		return JSON.parse(body);
	} else {
		// Otherwise return the response body as text
		return body;
	}
	
}
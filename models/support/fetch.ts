import { PathOptions } from '@models/support/paths';

export interface Headers {
	[header: string]: string | number;
}

export interface FetchOptions {

	method: string;

	path?: {
		app: string;
		service: string;
		alias: string;
		options?: PathOptions;
	}

	resolvedPath?: string;

	headers?: Headers;

	body?: any;
	form?: any;
	filePath?: string;

}

export interface RequestOptions {
	method: string;
	headers?: Headers;
	body?: any;
}

export interface FetchResponse {
	method: string;
	app: string;
	service: string;
	resource: string;
	headers: string[];
	status: number;
	statusText: string;
	body: any;
}
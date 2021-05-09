module.exports = function (chai, util) {

	let Assertion = chai.Assertion;
	let flag = util.flag;

	/**
	 * Assert that an API response has the provided expected status
	 */
	Assertion.addMethod('status', function (expectedStatus) {

		// Find actual status in response object
		let actStatus = this._obj.status;

		this.assert(
			actStatus === expectedStatus,
			'expected response status to be #{exp}, but received #{act}',
			'expected response status not to be #{exp}, but received #{act}',
			expectedStatus,
			actStatus
		);

	});

	/**
	 * Assert that an API response includes a provided expected header
	 * Updates the assertion target to be the header value (if present) for later assertions
	 */
	Assertion.addMethod('header', function (expectedHeader) {

		// Retrieve headers from API response object
		let headers = this._obj.headers;

		this.assert(
			Object.prototype.hasOwnProperty.call(headers, expectedHeader),
			'expected response to have a #{exp} header, but did not receive it',
			'expected response not to have a #{exp} header, but received it',
			expectedHeader
		);

		// Update assertion target
		flag(this, 'object', headers[expectedHeader]);

	});

};



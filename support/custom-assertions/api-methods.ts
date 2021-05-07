module.exports = function (chai, util) {

	let Assertion = chai.Assertion;
	let flag = util.flag;

	Assertion.addMethod('status', function (expStatus) {

		let actStatus = this._obj.status;

		this.assert(
			actStatus === expStatus,
			'expected response status to be #{exp}, but received #{act}',
			'expected response status not to be #{exp}, but received #{act}',
			expStatus,
			actStatus
		);

	});

	Assertion.addMethod('header', function (expHeader) {

		let headers = this._obj.headers;

		this.assert(
			Object.prototype.hasOwnProperty.call(headers, expHeader),
			'expected response to have #{exp} header, but did not receive it',
			'expected response not to have #{exp} header, but received it'
		);

		flag(this, 'object', headers[expHeader]);

	});

};



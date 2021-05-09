import { validate } from '@support/validators/schema';
import { Context } from 'mocha';

module.exports = function (chai) {

	let Assertion = chai.Assertion;

	Assertion.addProperty('conform');

	/**
	 * Validate assertion target against provided schema
	 */
	Assertion.addMethod('schema', function(mocha: Context, schemaPath: string, isArray?: boolean) {

		const result = validate(mocha, this._obj, schemaPath, isArray);
		const error = result.errors[0];

		this.assert(
			result.isValid,
			`Expected object to conform to schema: ${error?.instancePath} ${error?.message} (actual: ${error?.data})`,
			null
		);

	});

};

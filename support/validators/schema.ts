import { getAbsPath } from '@support/files';
import { Context } from 'mocha';
import Ajv, { ErrorObject, JSONSchemaType } from 'ajv';

const ajv = new Ajv({ allErrors: true, verbose: true });
const addContext = require('mochawesome/addContext');

/**
 * Retrieve schema based on supplied alias
 * FUTURE CONCEPT: resolve references within schema
 * @param schemaAlias schema to be retrieved
 * @param isArray indicate whether schema should be modified to be an array of the original schema
 * @returns resolved schema
 */
export function getSchema(schemaAlias: string, isArray?: boolean): JSONSchemaType<any> {

	// Retrieve schema from file
	let schema: JSONSchemaType<any> = require(getAbsPath('files/schema/' + schemaAlias));

	// Modify retrieved schema if an array version is required
	if (isArray) {
		schema = {
			type: 'array',
			items: schema
		};
	}

	// TO DO: resolve references within schemas

	return schema;

}

/**
 * Validates a JSON object against a specified schema
 * @param mocha mocha test object (required for logging)
 * @data JSON object to be validated
 * @param schemaAlias schema to be retrieved
 * @param isArray indicate whether schema should be modified to be an array of the original schema
 * @returns schema validation result
 */
export function validate(mocha: Context, data: any, schemaAlias: string, isArray?: boolean) {

	// Retrieve schema and validate object against it
	const schema = getSchema(schemaAlias, isArray);
	const validate = ajv.compile(schema);
	const valid = validate(data);

	// Log result on pass or fail
	if (valid) {
		addContext(mocha, 'Schema validation PASSED');
	} else {

		// Modify errors to remove unnecessary data
		validate.errors.forEach((error: ErrorObject) => {
			delete error.schema;
			delete error.parentSchema;
		});

		addContext(mocha, { title: 'Schema validation FAILED', value: validate.errors });
	}

	return {
		isValid: valid,
		errors: validate.errors || []
	};

}
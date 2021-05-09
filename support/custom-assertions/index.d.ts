import { Context } from 'mocha';

/* eslint-disable no-unused-vars */
declare global {
	namespace Chai {
		interface Assertion {
			// API methods
			status(expectedStatus: number): Assertion;
			header(expectedHeader: string): Assertion;

			// Schema validation
			conform: Assertion;
			schema(mocha: Context, schemaPath: string, isArray?: boolean): Assertion;
		}
	}
}

declare function apiMethods(chai: any): void;

export = apiMethods;
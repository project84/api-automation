/* eslint-disable no-unused-vars */
declare global {
	namespace Chai {
		interface Assertion {
			status(expStatus: number): Assertion;
			header(expHeader: string): Assertion;
		}
	}
}

declare function apiMethods(chai: any): void;

export = apiMethods;
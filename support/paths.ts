import { BaseUrl, Path, PathOptions, PathVariables, QueryParam } from '@models/support/paths';
import { getAbsPath } from './files';

const baseUrls: BaseUrl = require('@paths/base-urls');

/**
 * Retrieves the base URL for the specified app
 * @param app alias for the desired app
 * @returns base URL (string)
 */
export function getBaseUrl(app: string, version?: number): string {
	return baseUrls[app].replace('<version>', version?.toString());
}

/**
 * Retrieves the specified API path, resolving variables and 
 * @param app alias for the desired app
 * @param service alias for the desired service within the desired
 * @param pathAlias alias for the desired path
 */
export function getPath(app: string, service: string, pathAlias: string, options: PathOptions = {}): string {

	// Retrieve parameters for specified path and construct initial path
	const params: Path = require(getAbsPath(`files/path-library/${app}/${service}/paths`))[pathAlias];
	let path: string = getBaseUrl(app, params.version) + params.path;

	if (options.pathVariables) {
		// Replace variables in path if present
		path = resolvePathVariables(path, options.pathVariables);
	}

	if (options.queryParams) {
		// Add query params if specified
		path = constructQueryParams(path, options.queryParams);
	}

	return path;

}

/**
 * Replace variable elements of an API path with variable values
 * @param path API path including variables to be replaced
 * @param variables library of variable values
 * @returns full API path with variable values
 */
function resolvePathVariables(path: string, variables: PathVariables): string {

	// Convert path variables object to array
	const keys: string[] = Object.keys(variables);

	keys.forEach(key => {
		// Replace each variable in the path with its value
		const matchingString = '<' + key + '>';
		path = path.replace(matchingString, variables[key].toString());
	});

	return path;

}

/**
 * Adds query params to a resolved API path
 * @param path path without query params
 * @param queryParams structured list of query params
 * @returns path including formatted query params
 */
function constructQueryParams(path: string, queryParams: QueryParam[]): string {

	queryParams.forEach((queryParam: QueryParam, i: number) => {
		// Add appropriate delimeter between each param type
		path += i === 0 ? '?' : '&';

		// Contrusct value for each param type and add to the path
		path += queryParam.alias + '=' + queryParam.values.join(queryParam.delimeter);
	});

	return path;
}
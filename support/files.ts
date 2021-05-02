import * as path from 'path';

/**
 * Resolve an absolute path to a file in the project
 * @param pathToResolve string 
 * @returns absolute path (string)
 */
export function getAbsPath(pathToResolve: string) {
	return path.join(__dirname, '..', pathToResolve);
}
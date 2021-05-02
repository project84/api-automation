export interface BaseUrl {
	[item: string]: string;
}

export interface Path {
	path: string;
	version?: number;
}

export interface PathList {
	[item: string]: Path;
}

export interface PathVariables {
	[item: string]: string | number;
}

export interface QueryParam {
	alias: string;
	values: ( string | number )[];
	delimeter: string;
}

export interface PathOptions {
	pathVariables?: PathVariables;
	queryParams?: QueryParam[];
}
import { FetchOptions } from '@models/support/fetch';
import { request } from '@support/fetch';
import { Context } from 'mocha';

/**
 * Retrieve all current pizza orders
 * @param mocha mocha test object
 * @returns pizza orders API response
 */
export async function getOrders(mocha: Context) {
	const requestOptions: FetchOptions = {
		method: 'GET',
		path: { app: 'pizza', service: 'orders', alias: 'orders' }
	};
	return request(mocha, requestOptions);
}

/**
 * Create a new pizza order
 * @param mocha mocha test object
 * @param body request body
 * @returns create pizza API response
 */
export async function createOrder(mocha: Context, body: any) {
	const requestOptions: FetchOptions = {
		method: 'POST',
		path: { app: 'pizza', service: 'orders', alias: 'orders' },
		body: body
	};
	return request(mocha, requestOptions);
}

/**
 * Delete a specified pizza order
 * @param mocha mocha test object
 * @param orderId ID of pizza order to be deleted
 * @returns Pizza deletion API response
 */
export async function deleteOrder(mocha: Context, orderId: number) {
	const requestOptions: FetchOptions = {
		method: 'DELETE',
		path: { 
			app: 'pizza', 
			service: 'orders', 
			alias: 'singleOrder', 
			options: { 
				pathVariables: { 
					orderId: orderId 
				} 
			} 
		}
	};
	return request(mocha, requestOptions);
}

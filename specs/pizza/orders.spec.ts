import * as chai from 'chai';
const expect = chai.expect;

import { request } from '@support/fetch';

context('Orders', function () {

	it('A user must be able to retrieve all pizza orders', async function () {

		let res = await request(this, {
			method: 'GET',
			path: {
				app: 'pizza',
				service: 'orders',
				alias: 'allOrders'
			}
		});

		expect(res.status).to.be.equal(200);

	});

});

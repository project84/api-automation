import * as chai from 'chai';
const expect = chai.expect;

import { createOrder, getOrders } from '@modules/pizza/orders';
import { FetchResponse } from '@models/support/fetch';
import { Pizza } from '@models/pizza/pizza';

context('Orders', function () {

	it('A user must be able to retrieve all pizza orders', async function () {

		// Retrieve pizza order list and verify response status
		const res: FetchResponse = await getOrders(this);
		expect(res.status).to.be.equal(200);

	});

	// Skipped due to inability to authorise for endpoint access
	it.skip('A user must be able to create a new pizza order', async function () {

		// Set options for pizza
		const pizza: Pizza = {
			Crust: 'NORMAL',
			Flavor: 'CHEESE',
			Size: 'L',
			Table_No: 3
		};

		// Create new pizza order and verify response status
		const res: FetchResponse = await createOrder(this, pizza);
		expect(res.status).to.be.equal(200);

	});

});

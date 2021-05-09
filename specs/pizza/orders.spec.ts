import { expect } from 'chai';

import { createOrder, deleteOrder, getOrders } from '@modules/pizza/orders';
import { Pizza } from '@models/pizza/pizza';

context('Orders', function () {

	it('A user must be able to retrieve all pizza orders', async function () {

		// Retrieve pizza order list and verify response status
		const res = await getOrders(this);
		expect(res).to.have.status(200);

		// Validate response body against schema
		expect(res.body).to.conform.to.schema(this, 'pizza/order', true);

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
		const res = await createOrder(this, pizza);
		expect(res).to.have.status(200);

		// Validate response body against schema
		expect(res.body).to.conform.to.schema(this, 'pizza/order');

	});

	// Skipped due to inability to authorise for endpoint access
	it.skip('A user must be able to delete a pizza order', async function () {

		// Delete pizza order and verify response status
		const res = await deleteOrder(this, 1);
		expect(res).to.have.status(200);

		// Validate response body against schema
		expect(res.body).to.conform.to.schema(this, 'pizza/order-deletion');

		// Verify that the order was deleted successfully
		expect(res.body?.message).to.be.equal('Order deleted');

	});

	it('A user must not be able to delete a pizza order that does not exist', async function () {

		const orderId = 4;

		// Delete pizza order and verify response status
		const res = await deleteOrder(this, orderId);
		expect(res).to.have.status(404);

		const body = JSON.parse(res.body);

		// Validate response body against schema
		expect(body).to.conform.to.schema(this, 'pizza/error');

		// Verify API response contains the expected error message
		expect(body.detail).to.be.equal(`Order not found for ID: ${orderId}`);

	});

	it('A user must not be able to delete a pizza order with an invalid order ID', async function () {

		// Delete pizza order and verify response status
		const res = await deleteOrder(this, -1);
		expect(res).to.have.status(404);

		const body = JSON.parse(res.body);

		// Validate response body against schema
		expect(body).to.conform.to.schema(this, 'pizza/error');

		// Verify API response contains the expected error message
		expect(body.detail).to.be.equal('The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.');

	});

});

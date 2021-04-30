import * as chai from 'chai';
const expect = chai.expect;



context('Initial suite', function () {

	it('A first basic test', async function () {

		this.timeout(10000);

		expect(1).to.equal(1);

	});

});

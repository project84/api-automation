import * as chai from 'chai';
const expect = chai.expect;

const sleep = m => new Promise(r => setTimeout(r, m));

context('Initial suite', function () {

	it('A first basic test', async function () {

		this.timeout(10000);

		const waitTime: Number = 5000;

		console.log(new Date().toDateString());
		await delay(waitTime);

		expect(1).to.be.equal(1);

	});

});

async function delay(time) {
	await sleep(time);
}

// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Tests --------------------------------------------------------
import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- DotEnv --------------------------------------------------------
import { config } from 'dotenv';
config();
// ---------------------------------------------------------------------------------------------------------------------

const baseUrl = process.env.BASE_URL;

let token = '';
let linkId = '';

// ----------------------------------------------------- Public --------------------------------------------------------
describe('I. Public - Links', () => {
	it('1.01 GET     - links', async () => {
		const response = await request(baseUrl).get('/links');

		expect(response.statusCode).toBe(200);
	});
});

// ----------------------------------------------------- Private -------------------------------------------------------
describe('I.I Sign in', () => {
	it('1-1 POST    - Sign in', async () => {
		const response = await request(baseUrl).post('/auth/signin').send({
			email: process.env.TEST_USER,
			password: process.env.TEST_PASSWORD,
		});

		expect(response.statusCode).toBe(200);

		token = response.body.token;
	});
});

// --------------------------------------------------- Create link -----------------------------------------------------
describe('II. Create Links', () => {
	it('2.01 POST    - Any token', async () => {
		const response = await request(baseUrl).post('/link');

		expect(response.statusCode).toBe(401);
	});

	it('2.02 POST    - Wrong token', async () => {
		const response = await request(baseUrl)
			.post('/link')
			.set('Authorization', 'notAGoodToken');

		expect(response.statusCode).toBe(404);
	});

	it('2.03 POST    - Missing body fields', async () => {
		const response = await request(baseUrl)
			.post('/link')
			.set('Authorization', token);

		expect(response.statusCode).toBe(400);
	});

	it('2.04 POST    - Create link', async () => {
		const response = await request(baseUrl)
			.post('/link')
			.set('Authorization', token)
			.send({
				name: 'TestLink',
				icon: 'testOutline',
				color: '#ffffff',
				link: 'https://www.google.fr/',
			});

		expect(response.statusCode).toBe(200);

		linkId = response.body._id;
	});
});

// --------------------------------------------------- Update link -----------------------------------------------------
describe('III. Update Links', () => {
	it('3.01 PUT     - Any token', async () => {
		const response = await request(baseUrl).put('/link');

		expect(response.statusCode).toBe(401);
	});

	it('3.02 PUT     - Wrong token', async () => {
		const response = await request(baseUrl)
			.put('/link')
			.set('Authorization', 'notAGoodToken');

		expect(response.statusCode).toBe(404);
	});

	it('3.03 PUT     - Missing body fields', async () => {
		const response = await request(baseUrl)
			.put('/link')
			.set('Authorization', token);

		expect(response.statusCode).toBe(400);
	});

	it('3.04 PUT     - Update link', async () => {
		const response = await request(baseUrl)
			.put('/link')
			.set('Authorization', token)
			.send({
				name: 'TestLink1',
				icon: 'testOutline',
				color: '#ffffff',
				link: 'https://www.google.fr/',
			});

		expect(response.statusCode).toBe(200);
	});
});

// --------------------------------------------------- Delete link -----------------------------------------------------
describe('IV. Delete Links', () => {
	it('4.01 DELETE     - Any token', async () => {
		const response = await request(baseUrl).delete('/link');

		expect(response.statusCode).toBe(401);
	});

	it('4.02 DELETE     - Wrong token', async () => {
		const response = await request(baseUrl)
			.delete('/link')
			.set('Authorization', 'notAGoodToken');

		expect(response.statusCode).toBe(404);
	});

	it('4.03 DELETE     - Missing body fields', async () => {
		const response = await request(baseUrl)
			.delete('/link')
			.set('Authorization', token);

		expect(response.statusCode).toBe(400);
	});

	it('4.04 DELETE     - Delete link', async () => {
		const response = await request(baseUrl)
			.delete('/link')
			.set('Authorization', token)
			.send({
				id: linkId,
			});

		expect(response.statusCode).toBe(200);
	});
});

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
let messageId = '';

describe('0. Sign in', () => {
	it('0.01 POST    - Sign in', async () => {
		const response = await request(baseUrl).post('/auth/signin').send({
			email: process.env.TEST_USER,
			password: process.env.TEST_PASSWORD,
		});

		expect(response.statusCode).toBe(200);

		token = response.body.token;
	});
});

// ----------------------------------------------------- Public --------------------------------------------------------
describe('I. Public - Messages', () => {
	it('1.01 GET     - Any token', async () => {
		const response = await request(baseUrl).get('/messages');

		expect(response.statusCode).toBe(401);
	});

	it('1.02 GET     - Wrong token', async () => {
		const response = await request(baseUrl)
			.get('/messages')
			.set('Authorization', 'notAGoodToken');

		expect(response.statusCode).toBe(404);
	});

	it('1.03 GET     - Messages', async () => {
		const response = await request(baseUrl)
			.get('/messages')
			.set('Authorization', token);

		expect(response.statusCode).toBe(200);
	});
});

// ----------------------------------------------------- Private -------------------------------------------------------
// --------------------------------------------------- Create link -----------------------------------------------------
describe('II. Create Message', () => {
	it('2.01 POST    - Missing body fields', async () => {
		const response = await request(baseUrl)
			.post('/message')
			.set('Authorization', token);

		expect(response.statusCode).toBe(400);
	});

	it('2.02 POST    - Create message', async () => {
		const response = await request(baseUrl)
			.post('/message')
			.set('Authorization', token)
			.send({
				firstname: 'Test',
				lastname: 'Test',
				email: 'Test',
				header: 'Test',
				content: 'Test',
			});

		expect(response.statusCode).toBe(200);

		messageId = response.body._id;
	});
});

// --------------------------------------------------- Delete link -----------------------------------------------------
describe('III. Delete Message', () => {
	it('4.01 DELETE     - Any token', async () => {
		const response = await request(baseUrl).delete('/skill');

		expect(response.statusCode).toBe(401);
	});

	it('4.02 DELETE     - Wrong token', async () => {
		const response = await request(baseUrl)
			.delete('/skill')
			.set('Authorization', 'notAGoodToken');

		expect(response.statusCode).toBe(404);
	});

	it('4.03 DELETE     - Missing body fields', async () => {
		const response = await request(baseUrl)
			.delete('/skill')
			.set('Authorization', token);

		expect(response.statusCode).toBe(400);
	});

	it('4.04 DELETE     - Delete skill', async () => {
		const response = await request(baseUrl)
			.delete('/skill')
			.set('Authorization', token)
			.send({
				id: messageId,
			});

		expect(response.statusCode).toBe(200);
	});
});

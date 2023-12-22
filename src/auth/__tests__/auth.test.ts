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
let userId = '';

// ----------------------------------------------------- Sign in -------------------------------------------------------
describe('I. Sign in', () => {
	it('1.01 POST    - Missing body field', async () => {
		const response = await request(baseUrl).post('/auth/signin');

		expect(response.statusCode).toBe(400);
	});

	it('1.02 POST    - Wrong credentials', async () => {
		const response = await request(baseUrl).post('/auth/signin').send({
			email: 'notAGoodEmail@test.com',
			password: process.env.TEST_PASSWORD,
		});

		expect(response.statusCode).toBe(500);
	});

	it('1.03 POST    - Sign in', async () => {
		const response = await request(baseUrl).post('/auth/signin').send({
			email: process.env.TEST_USER,
			password: process.env.TEST_PASSWORD,
		});

		expect(response.statusCode).toBe(200);

		token = response.body.token;
	});

	it('1.04 POST    - Already logged in', async () => {
		const response = await request(baseUrl)
			.post('/auth/signin')
			.set('Authorization', token)
			.send({
				email: process.env.TEST_USER,
				password: process.env.TEST_PASSWORD,
			});

		expect(response.body.message).toBe('Already logged in');
	});
});

// ----------------------------------------------- Token verification --------------------------------------------------
describe('II. Auth verification', () => {
	it('2.01 GET     - Any token', async () => {
		const response = await request(baseUrl).get('/auth');

		expect(response.statusCode).toBe(401);
	});

	it('2.02 GET     - Wrong token', async () => {
		const response = await request(baseUrl)
			.get('/auth')
			.set('Authorization', 'notAGoodToken');

		expect(response.statusCode).toBe(404);
	});

	it('2.03 GET     - Good token', async () => {
		const response = await request(baseUrl)
			.get('/auth')
			.set('Authorization', token);

		expect(response.statusCode).toBe(200);
	});
});

// ---------------------------------------------------- Get users ------------------------------------------------------
describe('III. Get Users', () => {
	it('3.01 GET     - Any token', async () => {
		const response = await request(baseUrl).get('/users');

		expect(response.statusCode).toBe(401);
	});

	it('3.02 GET    - Wrong token', async () => {
		const response = await request(baseUrl)
			.get('/users')
			.set('Authorization', 'notAGoodToken');

		expect(response.statusCode).toBe(404);
	});

	it('3.03 GET    - Get users', async () => {
		const response = await request(baseUrl)
			.get('/users')
			.set('Authorization', token);

		expect(response.statusCode).toBe(200);
	});
});

// ----------------------------------------------------- Sign up -------------------------------------------------------
describe('IV. Sign Up', () => {
	it('4.01 POST    - Any token', async () => {
		const response = await request(baseUrl).post('/auth/signup');

		expect(response.statusCode).toBe(401);
	});

	it('4.02 POST    - Wrong token', async () => {
		const response = await request(baseUrl)
			.post('/auth/signup')
			.set('Authorization', 'notAGondToken');

		expect(response.statusCode).toBe(404);
	});

	it('4.03 POST    - Missing body field', async () => {
		const response = await request(baseUrl)
			.post('/auth/signup')
			.set('Authorization', token);

		expect(response.statusCode).toBe(400);
	});

	it('4.04 POST    - Sign up', async () => {
		const response = await request(baseUrl)
			.post('/auth/signup')
			.set('Authorization', token)
			.send({
				name: 'Test User',
				email: 'aNewUser@test.com',
				password: 'test',
			});

		expect(response.statusCode).toBe(200);

		userId = response.body._id;
	});

	it('4.05 POST     - Sign in this new account', async () => {
		const response = await request(baseUrl).post('/auth/signin').send({
			email: 'aNewUser@test.com',
			password: 'test',
		});

		expect(response.statusCode).toBe(200);

		token = response.body.token;
	});
});

// ------------------------------------------------- Change password ---------------------------------------------------
describe('V. Change Password', () => {
	it('5.01 PUT     - Any token', async () => {
		const response = await request(baseUrl).put('/auth/password');

		expect(response.statusCode).toBe(401);
	});

	it('5.02 PUT     - Wrong token', async () => {
		const response = await request(baseUrl)
			.put('/auth/password')
			.set('Authorization', 'notAGondToken');

		expect(response.statusCode).toBe(404);
	});

	it('5.03 PUT     - Missing body field', async () => {
		const response = await request(baseUrl)
			.put('/auth/password')
			.set('Authorization', token);

		expect(response.statusCode).toBe(400);
	});

	it('5.04 PUT     - Change password', async () => {
		const response = await request(baseUrl)
			.put('/auth/password')
			.set('Authorization', token)
			.send({
				oldPassword: 'test',
				password: 'test1',
			});

		expect(response.statusCode).toBe(200);
	});
});

// -------------------------------------------------- Change email -----------------------------------------------------
describe('VI. Change Email', () => {
	it('6.01 PUT     - Any token', async () => {
		const response = await request(baseUrl).put('/auth/email');

		expect(response.statusCode).toBe(401);
	});

	it('6.02 PUT     - Wrong token', async () => {
		const response = await request(baseUrl)
			.put('/auth/email')
			.set('Authorization', 'notAGondToken');

		expect(response.statusCode).toBe(404);
	});

	it('6.03 PUT     - Missing body field', async () => {
		const response = await request(baseUrl)
			.put('/auth/email')
			.set('Authorization', token);

		expect(response.statusCode).toBe(400);
	});

	it('6.04 PUT     - Change email', async () => {
		const response = await request(baseUrl)
			.put('/auth/email')
			.set('Authorization', token)
			.send({
				oldEmail: 'aNewUser@test.com',
				email: 'aNewUserWithNewEmail@test.com',
			});

		expect(response.statusCode).toBe(200);
	});
});

// ------------------------------------------------- Delete account ----------------------------------------------------
describe('VII. Delete account', () => {
	it('7.01 DELETE  - Any token', async () => {
		const response = await request(baseUrl).delete('/auth/delete');

		expect(response.statusCode).toBe(401);
	});

	it('7.02 DELETE  - Wrong token', async () => {
		const response = await request(baseUrl)
			.delete('/auth/delete')
			.set('Authorization', 'notAGondToken');

		expect(response.statusCode).toBe(404);
	});

	it('7.03 DELETE  - Missing body field', async () => {
		const response = await request(baseUrl)
			.delete('/auth/delete')
			.set('Authorization', token);

		expect(response.statusCode).toBe(400);
	});

	it('7.04 DELETE  - Delete account', async () => {
		const response = await request(baseUrl)
			.delete('/auth/delete')
			.set('Authorization', token)
			.send({
				id: userId,
			});

		expect(response.statusCode).toBe(200);
	});
});

// ---------------------------------------------------- Sign out -------------------------------------------------------
describe('VIII. Sign out', () => {
	it('8.01 DELETE  - Sign in in the the first account', async () => {
		const response = await request(baseUrl).post('/auth/signin').send({
			email: process.env.TEST_USER,
			password: process.env.TEST_PASSWORD,
		});

		expect(response.statusCode).toBe(200);

		token = response.body.token;
	});

	it('8.02 DELETE  - Any token', async () => {
		const response = await request(baseUrl).delete('/auth/signout');

		expect(response.statusCode).toBe(401);
	});

	it('8.03 DELETE  - Wrong token', async () => {
		const response = await request(baseUrl)
			.delete('/auth/signout')
			.set('Authorization', 'notAGondToken');

		expect(response.statusCode).toBe(404);
	});
	it('8.04 DELETE  - Sign out', async () => {
		const response = await request(baseUrl)
			.delete('/auth/signout')
			.set('Authorization', token)
			.send({
				id: userId,
			});

		expect(response.statusCode).toBe(200);
	});
});

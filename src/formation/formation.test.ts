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
let formationId = '';

// ----------------------------------------------------- Public --------------------------------------------------------
describe('I. Public - Formations', () => {
	it('1.01 GET     - formations', async () => {
		const response = await request(baseUrl).get('/formations');

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
describe('II. Create formation', () => {
	it('2.01 POST    - Any token', async () => {
		const response = await request(baseUrl).post('/formation');

		expect(response.statusCode).toBe(401);
	});

	it('2.02 POST    - Wrong token', async () => {
		const response = await request(baseUrl)
			.post('/formation')
			.set('Authorization', 'notAGoodToken');

		expect(response.statusCode).toBe(401);
	});

	it('2.03 POST    - Missing body fields', async () => {
		const response = await request(baseUrl)
			.post('/formation')
			.set('Authorization', token);

		expect(response.statusCode).toBe(404);
	});

	it('2.04 POST    - Create formation', async () => {
		const response = await request(baseUrl)
			.post('/formation')
			.set('Authorization', token)
			.send({
				header: 'TestSchool',
				school: 'testSchool',
				startedYear: '2023',
				endedYear: '2024',
				content: '["Hola"]',
			});

		expect(response.body.header).toBe('TestSchool');

		formationId = response.body._id;
	});
});

// --------------------------------------------------- Update link -----------------------------------------------------
describe('III. Update Formation', () => {
	it('3.01 PUT     - Any token', async () => {
		const response = await request(baseUrl).put(
			`/formation/${formationId}`,
		);

		expect(response.statusCode).toBe(401);
	});

	it('3.02 PUT     - Wrong token', async () => {
		const response = await request(baseUrl)
			.put(`/formation/${formationId}`)
			.set('Authorization', 'notAGoodToken');

		expect(response.statusCode).toBe(401);
	});

	it('3.03 PUT     - Missing body fields', async () => {
		const response = await request(baseUrl)
			.put(`/formation/${formationId}`)
			.set('Authorization', token);

		expect(response.statusCode).toBe(404);
	});

	it('3.04 PUT     - Update formation', async () => {
		const response = await request(baseUrl)
			.put(`/formation/${formationId}`)
			.set('Authorization', token)
			.send({
				header: 'Test School',
				school: 'testSchool',
				startedYear: '2023',
				endedYear: '2024',
				content: '["Hola"]',
			});

		expect(response.body.header).toBe('Test School');
	});
});

// --------------------------------------------------- Delete link -----------------------------------------------------
describe('IV. Delete Formation', () => {
	it('4.01 DELETE     - Any token', async () => {
		const response = await request(baseUrl).delete(
			`/formation/${formationId}`,
		);

		expect(response.statusCode).toBe(401);
	});

	it('4.02 DELETE     - Wrong token', async () => {
		const response = await request(baseUrl)
			.delete(`/formation/${formationId}`)
			.set('Authorization', 'notAGoodToken');

		expect(response.statusCode).toBe(401);
	});

	it('4.04 DELETE     - Delete formation', async () => {
		const response = await request(baseUrl)
			.delete(`/formation/${formationId}`)
			.set('Authorization', token);

		expect(response.statusCode).toBe(200);
	});
});

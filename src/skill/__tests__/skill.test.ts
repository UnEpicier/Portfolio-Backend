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
let skillId = '';

// ----------------------------------------------------- Public --------------------------------------------------------
describe('I. Public - Skills', () => {
	it('1.01 GET     - skills', async () => {
		const response = await request(baseUrl).get('/skills');

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
describe('II. Create Skill', () => {
	it('2.01 POST    - Any token', async () => {
		const response = await request(baseUrl).post('/skill');

		expect(response.statusCode).toBe(401);
	});

	it('2.02 POST    - Wrong token', async () => {
		const response = await request(baseUrl)
			.post('/skill')
			.set('Authorization', 'notAGoodToken');

		expect(response.statusCode).toBe(404);
	});

	it('2.03 POST    - Missing body fields', async () => {
		const response = await request(baseUrl)
			.post('/skill')
			.set('Authorization', token);

		expect(response.statusCode).toBe(400);
	});

	it('2.04 POST    - Create skill', async () => {
		const response = await request(baseUrl)
			.post('/skill')
			.set('Authorization', token)
			.send({
				name: 'TestSkill',
			});

		expect(response.statusCode).toBe(200);

		skillId = response.body._id;
	});
});

// --------------------------------------------------- Update link -----------------------------------------------------
describe('III. Update Skill', () => {
	it('3.01 PUT     - Any token', async () => {
		const response = await request(baseUrl).put('/skill');

		expect(response.statusCode).toBe(401);
	});

	it('3.02 PUT     - Wrong token', async () => {
		const response = await request(baseUrl)
			.put('/skill')
			.set('Authorization', 'notAGoodToken');

		expect(response.statusCode).toBe(404);
	});

	it('3.03 PUT     - Missing body fields', async () => {
		const response = await request(baseUrl)
			.put('/skill')
			.set('Authorization', token);

		expect(response.statusCode).toBe(400);
	});

	it('3.04 PUT     - Update skill', async () => {
		const response = await request(baseUrl)
			.put('/skill')
			.set('Authorization', token)
			.send({
				id: skillId,
				name: 'TestSkill1',
			});

		expect(response.statusCode).toBe(200);
	});
});

// --------------------------------------------------- Delete link -----------------------------------------------------
describe('IV. Delete Skill', () => {
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
				id: skillId,
			});

		expect(response.statusCode).toBe(200);
	});
});

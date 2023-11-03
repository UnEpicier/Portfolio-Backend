// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------- Sequelize & Models --------------------------------------------------
import { Sequelize } from 'sequelize';
import { defineModelToken } from '../models/token';
// ---------------------------------------------------------------------------------------------------------------------

export async function verifyToken(token: string) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const Model = defineModelToken(dbConn);

	const dbToken = await Model.findOne({
		where: { token },
		raw: true,
		attributes: ['token', 'createdAt'],
	});
	if (!dbToken) {
		return false;
	}

	const isoDate = new Date().toISOString();
	const diff =
		new Date(isoDate).getTime() - new Date(dbToken.createdAt).getTime();
	const seconds = Math.floor(diff / 1000);
	const tokenExpiration = parseInt(process.env.TOKEN_EXPIRATION ?? '3600'); // 3600 = 1 hour
	if (seconds > tokenExpiration) {
		await Model.destroy({
			where: { token },
			force: true,
		});
		return false;
	}

	return true;
}

export function generateToken(): string {
	function rand() {
		return Math.random().toString(36).substring(2);
	}

	let token = '';

	for (let i = 0; i < 16; i++) {
		token += rand();
	}

	return token;
}

// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- DotEnv --------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Sequelize ------------------------------------------------------
import { Sequelize } from 'sequelize';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Models --------------------------------------------------------
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

	const diff = new Date().getTime() - new Date(dbToken.createdAt).getTime();
	const seconds = Math.floor(diff / 1000);
	const tokenExpiration = parseInt(process.env.TOKEN_EXPIRATION || '3600'); // 3600 = 1 hour
	if (seconds > tokenExpiration) {
		await Model.destroy({
			where: { token },
			force: true,
		});
		return false;
	}

	return true;
}

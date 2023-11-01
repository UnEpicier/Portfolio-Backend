// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- DotEnv --------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------- Sequelize & Models --------------------------------------------------
import { Sequelize } from 'sequelize';
import { defineModelToken } from '../models/token';
import { defineModelUser } from '../models/user';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Crypto --------------------------------------------------------
import bcrypt from 'bcrypt';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken, generateToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

export async function checkToken(token: string) {
	return await verifyToken(token);
}

export async function signInUser(email: string, password: string) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const userModel = defineModelUser(dbConn);
	const tokenModel = defineModelToken(dbConn);

	const dbUser = await userModel.findOne({
		where: { email },
		attributes: ['id', 'password'],
	});

	if (!dbUser) {
		return {
			error: true,
			code: 1,
			message: "Can't find email",
		};
	}

	if (!bcrypt.compareSync(password, dbUser.password)) {
		return {
			error: true,
			code: 2,
			message: 'Wrong password',
		};
	}

	const token = generateToken();

	const newToken = await tokenModel.create({
		token: token,
		userId: dbUser.id,
	});

	return {
		message: 'Successfuly logged in',
		token: newToken.token,
	};
}

export async function signOutUser(token: string) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const tokenModel = defineModelToken(dbConn);

	try {
		await tokenModel.destroy({
			where: { token },
		});
	} catch (error) {
		return {
			success: false,
		};
	}

	return {
		success: true,
	};
}

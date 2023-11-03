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

export async function checkUserToken(token: string) {
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
			success: false,
			code: 404,
			message: 'Wrong credentials.',
		};
	}

	if (!bcrypt.compareSync(password, dbUser.password)) {
		return {
			success: false,
			code: 404,
			message: 'Wrong credentials.',
		};
	}

	const token = generateToken();

	try {
		await tokenModel.create({
			token: token,
			userId: dbUser.id,
		});
	} catch {
		return {
			success: false,
			code: 500,
			message: "Can't create a new token in database.",
		};
	}

	return {
		success: true,
		message: 'Successfuly logged in.',
		token: token,
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
	} catch {
		return {
			success: false,
			message: "Can't delete token from database.",
		};
	}

	return {
		success: true,
		message: 'Successfuly signed out.',
	};
}

export async function createAccount(
	name: string,
	email: string,
	password: string,
) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const userModel = defineModelUser(dbConn);

	try {
		userModel.create({
			name,
			email,
			password: bcrypt.hashSync(password, 10),
		});
	} catch {
		return {
			success: false,
			message: "Can't create a new account",
		};
	}

	return {
		success: true,
		message: `Successfuly created an account for ${name}`,
	};
}

export async function deleteUserAccount(name: string, email: string) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const userModel = defineModelUser(dbConn);
	const tokenModel = defineModelToken(dbConn);

	let userId;

	try {
		const user = await userModel.findOne({
			where: {
				name,
				email,
			},
			attributes: ['id'],
		});

		if (!user) {
			return {
				success: false,
				message: "Can't find an account with provided name and email.",
			};
		}

		userId = user.id;
	} catch {
		return {
			success: false,
			message: "Can't find an account with provided name and email.",
		};
	}

	try {
		await tokenModel.destroy({
			where: {
				userId,
			},
		});

		await userModel.destroy({
			where: {
				name,
				email,
			},
		});
	} catch {
		return {
			success: false,
			message: "Can't delete user or can't delete existing tokens.",
		};
	}

	return {
		success: true,
		message: `Successfuly deleted account of ${name}`,
	};
}

export async function changeUserPassword(
	token: string,
	oldPassword: string,
	password: string,
) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const tokenModel = defineModelToken(dbConn);
	const userModel = defineModelUser(dbConn);

	const dbToken = await tokenModel.findOne({
		where: {
			token,
		},
		attributes: ['userId'],
	});

	if (!dbToken) {
		return {
			success: false,
			message: "Can't find token in database.",
		};
	}

	try {
		const oldDbPassword = await userModel.findOne({
			where: {
				id: dbToken.userId,
			},
			attributes: ['password'],
		});

		if (!oldDbPassword) {
			return {
				success: false,
				message:
					"Can't find actual password for the corresponding account.",
			};
		}

		if (!bcrypt.compareSync(oldPassword, oldDbPassword.password)) {
			return {
				success: false,
				message:
					"Given old password doesn't match with the actual password.",
			};
		}
	} catch {
		return {
			success: false,
			message:
				"Can't find actual password for the corresponding account.",
		};
	}

	if (oldPassword == password) {
		return {
			success: false,
			message: 'Old password is the new wanted password.',
		};
	}

	try {
		const hashedPassword = bcrypt.hashSync(password, 10);
		await userModel.update(
			{ password: hashedPassword },
			{
				where: {
					id: dbToken.userId,
				},
			},
		);
	} catch {
		return {
			success: false,
			message: "Can't change the password.",
		};
	}

	return {
		success: true,
		message: 'Successfuly changed the password.',
	};
}

export async function changeUserEmail(
	token: string,
	oldEmail: string,
	email: string,
) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const tokenModel = defineModelToken(dbConn);
	const userModel = defineModelUser(dbConn);

	const dbToken = await tokenModel.findOne({
		where: {
			token,
		},
		attributes: ['userId'],
	});

	if (!dbToken) {
		return {
			success: false,
			message: "Can't find token in database.",
		};
	}

	try {
		const oldDbEmail = await userModel.findOne({
			where: {
				id: dbToken.userId,
			},
			attributes: ['email'],
		});

		if (!oldDbEmail) {
			return {
				success: false,
				message:
					"Can't find actual email for the corresponding account.",
			};
		}

		if (oldEmail != oldDbEmail.email) {
			return {
				success: false,
				message: "Given old email doesn't match with the actual email.",
			};
		}
	} catch {
		return {
			success: false,
			message: "Can't find actual email for the corresponding account.",
		};
	}

	if (oldEmail == email) {
		return {
			success: false,
			message: 'Old email is the new wanted email.',
		};
	}

	try {
		await userModel.update(
			{ email: email },
			{
				where: {
					id: dbToken.userId,
				},
			},
		);
	} catch {
		return {
			success: false,
			message: "Can't change the email.",
		};
	}

	try {
		await tokenModel.destroy({
			where: {
				userId: dbToken.userId,
			},
		});
	} catch {
		return {
			success: false,
			message: "Can't remove all active tokens",
		};
	}

	return {
		success: true,
		message: 'Successfuly changed the email.',
	};
}

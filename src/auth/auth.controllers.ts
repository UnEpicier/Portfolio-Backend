// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { connectToDB } from 'src/utils/database';
import User from 'src/models/user';
import Token from 'src/models/token';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Crypto --------------------------------------------------------
import bcrypt from 'bcrypt';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken, generateToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

export async function dbCheckToken(token: string) {
	return await verifyToken(token);
}

export async function dbGetUsers() {
	try {
		await connectToDB();

		return {
			success: true,
			users: User.find({}),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to get users.',
		};
	}
}

export async function dbSignIn(email: string, password: string) {
	try {
		await connectToDB();

		const userInDB = await User.findOne({
			email,
		});

		if (!userInDB) {
			return {
				success: false,
				message: 'Failed to found an user with the provided email.',
			};
		}

		if (!bcrypt.compareSync(password, userInDB.password)) {
			return {
				success: false,
				message: 'Wrong credentials.',
			};
		}

		const token = generateToken();

		await Token.create({
			token,
			userId: userInDB._id,
		});

		return {
			success: true,
			token,
		};
	} catch {
		return {
			success: false,
			message: 'Failed to authentificate user.',
		};
	}
}

export async function dbSignOut(token: string) {
	try {
		await connectToDB();

		await Token.deleteOne({
			token,
		});

		return {
			success: true,
		};
	} catch {
		return {
			success: false,
			message: 'Failed to sign out user.',
		};
	}
}

export async function dbSignUp(name: string, email: string, password: string) {
	try {
		await connectToDB();

		await User.create({
			name,
			email,
			password: bcrypt.hashSync(password, 10),
		});

		return {
			success: true,
			user: await User.findOne({ name, email }),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to create a new account.',
		};
	}
}

export async function dbDeleteUser(id: string) {
	try {
		await connectToDB();

		await User.deleteOne({
			_id: id,
		});

		await Token.deleteMany({
			_id: id,
		});

		return {
			success: true,
		};
	} catch {
		return {
			success: false,
			message: 'Failed to delete account.',
		};
	}
}

export async function dbChangePassword(
	token: string,
	oldPassword: string,
	password: string,
) {
	try {
		await connectToDB();

		const userInDB = await Token.findOne({
			token,
		}).populate('userId');

		if (!userInDB) {
			return {
				success: false,
				message: 'Failed to find user.',
			};
		}

		if (!bcrypt.compareSync(oldPassword, userInDB.password)) {
			return {
				success: false,
				message: 'Incorrect actual password.',
			};
		}

		User.updateOne(
			{
				_id: userInDB._id,
			},
			{
				password: bcrypt.hashSync(password, 10),
			},
		);

		return {
			success: true,
			user: User.findOne({ _id: userInDB._id }),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to update user password.',
		};
	}
}

export async function dbChangeEmail(
	token: string,
	oldEmail: string,
	email: string,
) {
	try {
		await connectToDB();

		const userInDB = await Token.findOne({
			token,
		}).populate('userId');

		if (!userInDB) {
			return {
				success: false,
				message: 'Failed to find user.',
			};
		}

		if (oldEmail != userInDB.email) {
			return {
				success: false,
				message: 'Incorrect actual email.',
			};
		}

		User.updateOne(
			{
				_id: userInDB._id,
			},
			{
				email: email,
			},
		);

		return {
			success: true,
			user: User.findOne({
				_id: userInDB._id,
			}),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to update user email.',
		};
	}
}

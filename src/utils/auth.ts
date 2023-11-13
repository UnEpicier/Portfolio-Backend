// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Dotenv --------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { connectToDB } from './database';
import Token, { IToken } from 'src/models/token';
// ---------------------------------------------------------------------------------------------------------------------

export async function verifyToken(token: string) {
	try {
		await connectToDB();

		const userToken: IToken | null = await Token.findOne({
			token: token,
		});

		if (!userToken) {
			return false;
		}

		const isoDate = new Date().toISOString();
		const diff =
			new Date(isoDate).getTime() - userToken.createdAt.getTime();
		const seconds = Math.floor(diff / 1000);
		const tokenExpiration = parseInt(
			process.env.TOKEN_EXPIRATION ?? '3600',
		); // 3600 = 1 hour
		if (seconds > tokenExpiration) {
			await Token.deleteOne({
				token,
			});
		}
		return true;
	} catch {
		return false;
	}
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

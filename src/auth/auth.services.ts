// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import { checkToken, signUserIn } from './auth.controllers';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

export async function getToken(req: Request, res: Response) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: 'Token not provided.' });
	}

	let tokenExists;
	try {
		tokenExists = await checkToken(token);
	} catch (error) {
		return res.status(500).json({ error });
	}

	return res.status(200).json({ tokenExists });
}

export async function signIn(req: Request, res: Response) {
	const token = req.headers.authorization;
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(400).json({
			error: true,
			message: 'Email or password field missing in body',
		});
	}

	if (token && (await verifyToken(token))) {
		return res.status(200).json({ message: 'Already logged in' });
	}

	const signedIn = await signUserIn(email, password);

	if (signedIn.error) {
		const httpCode =
			signedIn.code == 1 ? 404 : signedIn.code == 2 ? 200 : 500;
		return res.status(httpCode).json(signedIn);
	}

	return res.status(200).json(signedIn);
}

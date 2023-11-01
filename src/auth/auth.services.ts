// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import { verifyToken } from './auth.controllers';
// ---------------------------------------------------------------------------------------------------------------------

export async function getToken(req: Request, res: Response) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: 'Token not provided.' });
	}

	let tokenExists;
	try {
		tokenExists = await verifyToken(token);
	} catch (error) {
		return res.status(500).json({ error });
	}

	return res.status(200).json({ tokenExists });
}

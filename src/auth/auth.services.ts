// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import {
	dbCheckToken,
	dbGetUsers,
	dbSignIn,
	dbSignOut,
	dbSignUp,
	dbDeleteUser,
	dbChangeEmail,
	dbChangePassword,
} from './auth.controllers';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

export async function checkToken(req: Request, res: Response) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: 'Token not provided.' });
	}

	if (!(await dbCheckToken(token))) {
		return res.status(404).end();
	}

	return res.status(200).end();
}

export async function getUsers(req: Request, res: Response) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({
			message: 'Token not provided.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found in database.',
		});
	}

	const dbUsers = await dbGetUsers();

	if (!dbUsers.success) {
		return res.status(500).json({ message: dbUsers.message });
	}

	return res.status(200).json(dbUsers.users);
}

export async function signIn(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			message: 'Email or password field missing in body',
		});
	}

	if (token && (await verifyToken(token))) {
		return res.status(200).json({
			message: 'Already logged in',
		});
	}

	const signedIn = await dbSignIn(email, password);

	if (!signedIn.success) {
		return res.status(500).json({ message: signedIn.message });
	}

	return res.status(200).json({ token: signedIn.token });
}

export async function signOut(req: Request, res: Response) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({
			message: 'A token is required to logout.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found in database.',
		});
	}

	const signedOut = await dbSignOut(token);

	if (!signedOut.success) {
		return res.status(500).json({ message: signedOut.message });
	}

	return res.status(200).end();
}

export async function signUp(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { name, email, password } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to create a new account.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Provided token not found.',
		});
	}

	if (!name || !email || !password) {
		return res.status(400).json({
			error: true,
			message: 'Email or password field is missing in request body',
		});
	}

	const createdAccount = await dbSignUp(name, email, password);

	if (!createdAccount.success) {
		return res.status(500).json({ message: createdAccount.message });
	}

	return res.status(200).json(createdAccount.user);
}

export async function deletedAccount(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { id } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to delete an account.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Provided token not found.',
		});
	}

	if (!id) {
		return res.status(400).json({
			success: false,
			message: 'One field is missing in request body.',
		});
	}

	const deletedAccount = await dbDeleteUser(id);

	if (!deletedAccount.success) {
		return res.status(500).json({ message: deletedAccount.message });
	}

	return res.status(200).end();
}

export async function changePassword(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { oldPassword, password } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to change the password',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Provided token not found.',
		});
	}

	if (!password || !oldPassword) {
		return res.status(400).json({
			success: false,
			message: 'One of the password fields is missing in request body.',
		});
	}

	const changedPassword = await dbChangePassword(
		token,
		oldPassword,
		password,
	);

	if (!changedPassword.success) {
		return res.status(500).json({ message: changedPassword.message });
	}

	return res.status(200).json(changedPassword.user);
}

export async function changeEmail(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { oldEmail, email } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to change the password',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Provided token not found.',
		});
	}

	if (!email || !oldEmail) {
		return res.status(400).json({
			success: false,
			message: 'One of the email fields is missing in request body.',
		});
	}

	const changedEmail = await dbChangeEmail(token, oldEmail, email);

	if (!changedEmail.success) {
		return res.status(500).json({ message: changedEmail.message });
	}

	return res.status(200).json(changedEmail.user);
}

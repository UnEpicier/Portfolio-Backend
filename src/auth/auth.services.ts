// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import {
	checkUserToken,
	createAccount,
	signInUser,
	signOutUser,
	deleteUserAccount,
	changeUserPassword,
	changeUserEmail,
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

	if (!(await checkUserToken(token))) {
		return res.status(404).json({
			success: false,
			message: "Can't find provided token in database.",
		});
	}

	return res.status(200).json({
		success: true,
		message: 'Provided token found in database.',
	});
}

export async function signIn(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			error: true,
			message: 'Email or password field missing in body',
		});
	}

	if (token && (await verifyToken(token))) {
		return res.status(200).json({
			success: true,
			message: 'Already logged in',
		});
	}

	const signedIn = await signInUser(email, password);

	if (!signedIn.success && signedIn.code) {
		return res.status(signedIn.code).json(signedIn);
	}

	return res.status(200).json(signedIn);
}

export async function signOut(req: Request, res: Response) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A token is required to logout.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Provided token not found in database.',
		});
	}

	const signedOut = await signOutUser(token);

	return res.status(signedOut.success ? 200 : 500).json(signedOut);
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

	const accountCreated = await createAccount(name, email, password);

	return res.status(accountCreated.success ? 200 : 500).json(accountCreated);
}

export async function deletedAccount(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { name, email } = req.body;

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

	if (!name || !email) {
		return res.status(400).json({
			success: false,
			message: 'Name or email field is missing in request body.',
		});
	}

	const accountDeleted = await deleteUserAccount(name, email);

	return res.status(accountDeleted.success ? 200 : 500).json(accountDeleted);
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

	const passwordChanged = await changeUserPassword(
		token,
		oldPassword,
		password,
	);

	return res
		.status(passwordChanged.success ? 200 : 500)
		.json(passwordChanged);
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

	const emailChanged = await changeUserEmail(token, oldEmail, email);

	return res.status(emailChanged.success ? 200 : 500).json(emailChanged);
}

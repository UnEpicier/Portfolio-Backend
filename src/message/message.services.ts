// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import {
	dbGetMessages,
	dbPostMessage,
	dbDeleteMessage,
} from './message.controllers';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

export async function getMessages(req: Request, res: Response) {
	const token = req.headers.authorization;

	if (!token) {
		return {
			success: false,
			message: 'A valid token is required to get messages.',
		};
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Invalid authorization token.',
		});
	}

	const dbMessages = await dbGetMessages();

	return res.status(dbMessages.success ? 200 : 500).json(dbMessages);
}

export async function postMessage(req: Request, res: Response) {
	const { firstName, lastName, email, header, content } = req.body;

	if (!firstName) {
		return res.status(400).json({
			success: false,
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const messageCreated = await dbPostMessage(
		firstName,
		lastName,
		email,
		header,
		content,
	);

	return res.status(messageCreated.success ? 200 : 500).json(messageCreated);
}

export async function deleteMessage(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { id } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to delete a message.',
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
			message: 'One parameter is missing in request body.',
		});
	}

	const messageDeleted = await dbDeleteMessage(id);

	return res.status(messageDeleted.success ? 200 : 500).json(messageDeleted);
}

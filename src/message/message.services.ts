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
			message: 'A valid token is required to get messages.',
		};
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Invalid authorization token.',
		});
	}

	const dbMessages = await dbGetMessages();

	if (!dbMessages.success) {
		return res.status(500).json({ message: dbMessages.message });
	}

	return res.status(200).json(dbMessages.messages);
}

export async function postMessage(req: Request, res: Response) {
	const { firstname, lastname, email, header, content } = req.body;

	if (!firstname || !lastname || !email || !header || !content) {
		return res.status(400).json({
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const createdMessage = await dbPostMessage(
		firstname,
		lastname,
		email,
		header,
		content,
	);

	if (!createdMessage.success) {
		return res.status(500).json({ message: createdMessage.message });
	}

	return res.status(200).json(createdMessage.message);
}

export async function deleteMessage(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { id } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to delete a message.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found.',
		});
	}

	if (!id) {
		return res.status(400).json({
			message: 'One parameter is missing in request body.',
		});
	}

	const deletedMessage = await dbDeleteMessage(id);

	if (!deletedMessage.success) {
		return res.status(500).json({ message: deletedMessage.message });
	}

	return res.status(200).end();
}

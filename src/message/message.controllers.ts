// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import {
	getMessagesInDB,
	createMessageInDB,
	deleteMessageInDB,
} from './message.services';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

const getMessages = async (req: Request, res: Response) => {
	const token = req.headers.authorization;

	if (!token || !(await verifyToken(token))) {
		return res.status(401).json({
			error: {
				message: 'A valid token is required to get messages.',
				code: 401,
			},
		});
	}

	try {
		const messages = await getMessagesInDB();

		if (messages.length == 0) {
			return res.status(204).json([]);
		}

		return res.status(200).json(messages);
	} catch (error) {
		return res.status(500).json({
			error: {
				message: error,
				code: 500,
			},
		});
	}
};

const createMessage = async (req: Request, res: Response) => {
	const { firstname, lastname, email, header, content } = req.body;

	if (!firstname || !lastname || !email || !header || !content) {
		return res.status(404).json({
			error: {
				message:
					'One or multiple parameters is missing in request body.',
				code: 404,
			},
		});
	}

	try {
		const message = await createMessageInDB(
			firstname,
			lastname,
			email,
			header,
			content,
		);

		return res.status(200).json(message);
	} catch (error) {
		return res.status(500).json({
			error: {
				message: error,
				code: 500,
			},
		});
	}
};

const deleteMessage = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { id } = req.params;

	if (!token || !(await verifyToken(token))) {
		return res.status(401).json({
			message: 'A valid token is required to get messages.',
		});
	}

	try {
		await deleteMessageInDB(id);

		return res.status(200).end();
	} catch (error) {
		return res.status(500).json({
			error: {
				message: error,
				code: 500,
			},
		});
	}
};

export { getMessages, createMessage, deleteMessage };

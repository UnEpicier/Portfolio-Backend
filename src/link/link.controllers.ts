// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import {
	getLinksInDB,
	createLinkInDB,
	updateLinkInDB,
	deleteLinkInDB,
} from './link.services';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

const getLinks = async (_: Request, res: Response) => {
	try {
		const links = await getLinksInDB();

		if (links.length == 0) {
			return res.status(204).json([]);
		}

		return res.status(200).json(links);
	} catch (error) {
		return res.status(500).json({
			error: {
				message: error,
				code: 500,
			},
		});
	}
};

const createLink = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { name, icon, color, link } = req.body;

	if (!token || !(await verifyToken(token))) {
		return res.status(401).json({
			error: {
				message: 'A valid token is required to create a link',
				code: 401,
			},
		});
	}

	if (!name || !icon || !color || !link) {
		return res.status(404).json({
			error: {
				message:
					'One or multiple parameters is missing in request body.',
				code: 404,
			},
		});
	}

	try {
		const createdLink = await createLinkInDB(name, icon, color, link);

		return res.status(200).json(createdLink);
	} catch (error) {
		return res.status(500).json({
			error: {
				message: error,
				code: 500,
			},
		});
	}
};

const updateLink = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { id } = req.params;
	const { name, icon, color, link } = req.body;

	if (!token || !(await verifyToken(token))) {
		return res.status(401).json({
			error: {
				message: 'A valid token is required to update a link',
				code: 401,
			},
		});
	}

	if (!name || !icon || !color || !link) {
		return res.status(404).json({
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	try {
		const updatedLink = await updateLinkInDB(id, name, icon, color, link);

		return res.status(200).json(updatedLink);
	} catch (error) {
		return res.status(500).json({
			error: {
				message: error,
				code: 500,
			},
		});
	}
};

const deleteLink = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { id } = req.params;

	if (!token || !(await verifyToken(token))) {
		return res.status(401).json({
			error: {
				message: 'A valid token is required to delete a link',
				code: 401,
			},
		});
	}

	try {
		await deleteLinkInDB(id);

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

export { getLinks, createLink, updateLink, deleteLink };

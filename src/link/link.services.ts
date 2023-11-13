// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import {
	dbGetLinks,
	dbCreateLink,
	dbUpdateLink,
	dbDeleteLink,
} from './link.controllers';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

export async function getLinks(_: Request, res: Response) {
	const dbLinks = await dbGetLinks();

	if (!dbLinks.success) {
		return res.status(500).json(dbLinks.message);
	}

	return res.status(200).json(dbLinks.links);
}

export async function createLink(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { name, icon, color, link } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to create a link.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Invalid authorization token.',
		});
	}

	if (!name || !icon || !color || !link) {
		return res.status(400).json({
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const createdLink = await dbCreateLink(name, icon, color, link);

	if (!createdLink.success) {
		return res.status(500).json(createdLink.message);
	}

	return res.status(200).json(createdLink.link);
}

export async function updateLink(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { name, icon, color, link } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to update a link.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Invalid authorization token.',
		});
	}

	if (!name || !icon || !color || !link) {
		return res.status(400).json({
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const updatedLink = await dbUpdateLink(name, icon, color, link);

	if (!updatedLink.success) {
		return res.status(500).json(updatedLink.message);
	}

	return res.status(200).json(updatedLink.link);
}

export async function deleteLink(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { id } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to delete a link.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Invalid authorization token.',
		});
	}

	if (!id) {
		return res.status(400).json({
			message: 'One parameter is missing in request body.',
		});
	}

	const deletedLink = await dbDeleteLink(id);

	if (!deletedLink.success) {
		return res.status(500).json(deletedLink.message);
	}

	return res.status(200).end();
}

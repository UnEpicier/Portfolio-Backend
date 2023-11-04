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

export async function getLinks(req: Request, res: Response) {
	const dbLinks = await dbGetLinks();

	return res.status(200).json(dbLinks);
}

export async function createLink(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { name, icon, color, link } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to create a link.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Invalid authorization token.',
		});
	}

	if (!name || !icon || !color || !link) {
		return res.status(400).json({
			success: false,
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const linkCreated = await dbCreateLink(name, icon, color, link);

	return res.status(linkCreated.success ? 200 : 500).json(linkCreated);
}

export async function updateLink(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { name, icon, color, link } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to update a link.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Invalid authorization token.',
		});
	}

	if (!name || !icon || !color || !link) {
		return res.status(400).json({
			success: false,
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const linkUpdated = await dbUpdateLink(name, icon, color, link);

	return res.status(linkUpdated.success ? 200 : 500).json(linkUpdated);
}

export async function deleteLink(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { id } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to delete a link.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Invalid authorization token.',
		});
	}

	if (!id) {
		return res.status(400).json({
			success: false,
			message: 'One parameter is missing in request body.',
		});
	}

	const linkDeleted = await dbDeleteLink(id);

	return res.status(linkDeleted.success ? 200 : 500).json(linkDeleted);
}

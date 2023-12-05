// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import {
	dbGetExperiences,
	dbPostExperience,
	dbUpdateExperience,
	dbDeleteExperience,
} from './experience.controllers';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

export async function getExperiences(_: Request, res: Response) {
	const dbExperiences = await dbGetExperiences();

	if (!dbExperiences.success) {
		return res.status(500).json({ message: dbExperiences.message });
	}

	return res.status(200).json(dbExperiences.experiences);
}

export async function postExperience(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { header, society, startedYear, endedYear, content } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to post an experience.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found',
		});
	}

	if (!header || !society || !startedYear || !content) {
		return res.status(401).json({
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const postedExperience = await dbPostExperience(
		header,
		society,
		startedYear,
		endedYear,
		content,
	);

	if (!postedExperience.success) {
		return res.status(500).json({ message: postedExperience.message });
	}

	return res.status(200).json(postedExperience.experience);
}

export async function updateExperience(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { id, header, society, startedYear, endedYear, content } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to update an experience.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found',
		});
	}

	if (!id || !header || !society || !startedYear || !endedYear || !content) {
		return res.status(401).json({
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const updatedExperience = await dbUpdateExperience(
		id,
		header,
		society,
		startedYear,
		endedYear,
		content,
	);

	if (!updatedExperience.success) {
		return res.status(500).json({ message: updatedExperience.message });
	}

	return res.status(200).json(updatedExperience.experience);
}

export async function deleteExperience(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { id } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to delete an experience.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found.',
		});
	}

	if (!id) {
		return res.status(401).json({
			message: 'One parameter is missing in request body.',
		});
	}

	const deletedExperience = await dbDeleteExperience(id);

	if (!deletedExperience.success) {
		return res.status(500).json({ message: deletedExperience.message });
	}

	return res.status(200).end();
}

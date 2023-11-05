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

export async function getExperiences(req: Request, res: Response) {
	const dbExperiences = await dbGetExperiences();

	return res.status(dbExperiences.success ? 200 : 500).json(dbExperiences);
}

export async function postExperience(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { header, society, startedYear, endedYear, content } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to post an experience.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Provided token not found',
		});
	}

	if (!header || !society || !startedYear || !content) {
		return res.status(401).json({
			success: false,
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const experiencePosted = await dbPostExperience(
		header,
		society,
		startedYear,
		endedYear,
		content,
	);

	return res
		.status(experiencePosted.success ? 200 : 500)
		.json(experiencePosted);
}

export async function updateExperience(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { id, header, society, startedYear, endedYear, content } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to update an experience.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Provided token not found',
		});
	}

	if (!id || !header || !society || !startedYear || !endedYear || !content) {
		return res.status(401).json({
			success: false,
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const experiencePosted = await dbUpdateExperience(
		id,
		header,
		society,
		startedYear,
		endedYear,
		content,
	);

	return res
		.status(experiencePosted.success ? 200 : 500)
		.json(experiencePosted);
}

export async function deleteExperience(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { id } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to delete an experience.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Provided token not found.',
		});
	}

	if (!id) {
		return res.status(401).json({
			success: false,
			message: 'One parameter is missing in request body.',
		});
	}

	const experienceDeleted = await dbDeleteExperience(id);

	return res
		.status(experienceDeleted.success ? 200 : 500)
		.json(experienceDeleted);
}

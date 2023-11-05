// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import {
	dbGetFormations,
	dbPostFormation,
	dbUpdateFormation,
	dbDeleteFormation,
} from './formation.controllers';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

export async function getFormations(req: Request, res: Response) {
	const dbFormations = await dbGetFormations();

	return res.status(dbFormations.success ? 200 : 500).json(dbFormations);
}

export async function postFormation(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { header, school, startedYear, endedYear, content } = req.body;

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

	if (!header || !school || !startedYear || !content) {
		return res.status(401).json({
			success: false,
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const formationPosted = await dbPostFormation(
		header,
		school,
		startedYear,
		endedYear,
		content,
	);

	return res
		.status(formationPosted.success ? 200 : 500)
		.json(formationPosted);
}

export async function updateFormation(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { id, header, school, startedYear, endedYear, content } = req.body;

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

	if (!id || !header || !school || !startedYear || !endedYear || !content) {
		return res.status(401).json({
			success: false,
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const formationPosted = await dbUpdateFormation(
		id,
		header,
		school,
		startedYear,
		endedYear,
		content,
	);

	return res
		.status(formationPosted.success ? 200 : 500)
		.json(formationPosted);
}

export async function deleteFormation(req: Request, res: Response) {
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

	const formationDeleted = await dbDeleteFormation(id);

	return res
		.status(formationDeleted.success ? 200 : 500)
		.json(formationDeleted);
}

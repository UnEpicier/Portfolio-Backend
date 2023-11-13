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

	if (!dbFormations.success) {
		return res.status(500).json(dbFormations.message);
	}

	return res.status(200).json(dbFormations.formations);
}

export async function postFormation(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { header, school, startedYear, endedYear, content } = req.body;

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

	if (!header || !school || !startedYear || !content) {
		return res.status(401).json({
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const postedFormation = await dbPostFormation(
		header,
		school,
		startedYear,
		endedYear,
		content,
	);

	if (!postedFormation.success) {
		return res.status(500).json(postedFormation.message);
	}

	return res.status(200).json(postedFormation.formation);
}

export async function updateFormation(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { id, header, school, startedYear, endedYear, content } = req.body;

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

	if (!id || !header || !school || !startedYear || !endedYear || !content) {
		return res.status(401).json({
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const updatedFormation = await dbUpdateFormation(
		id,
		header,
		school,
		startedYear,
		endedYear,
		content,
	);

	if (!updatedFormation.success) {
		return res.status(500).json(updatedFormation.message);
	}

	return res.status(200).json(updatedFormation.formation);
}

export async function deleteFormation(req: Request, res: Response) {
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

	const deletedFormation = await dbDeleteFormation(id);

	if (!deletedFormation.success) {
		return res.status(500).json(deletedFormation.message);
	}

	return res.status(200).end();
}

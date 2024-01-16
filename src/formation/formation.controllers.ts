// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import {
	getFormationsInDB,
	createFormationInDB,
	dbUpdateFormation,
	dbDeleteFormation,
} from './formation.services';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

const getFormations = async (_: Request, res: Response) => {
	try {
		const formations = await getFormationsInDB();

		if (formations.length == 0) {
			return res.status(204).json([]);
		}

		return res.status(200).json(formations);
	} catch (error) {
		return res.status(500).json({
			error: {
				message: error,
				code: 500,
			},
		});
	}
};

const postFormation = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { header, school, startedYear, endedYear, content } = req.body;

	if (!token || !(await verifyToken(token))) {
		return res.status(401).json({
			error: {
				message: 'A valid token is required to post an experience',
				code: 401,
			},
		});
	}

	if (!header || !school || !startedYear || !content) {
		return res.status(404).json({
			error: {
				message:
					'One or multiple parameters is missing in request body',
				code: 404,
			},
		});
	}

	let parsedContent;
	try {
		parsedContent = JSON.parse(content);
	} catch {
		return res.status(500).json({
			error: {
				message: 'Failed to parse content field',
				code: 500,
			},
		});
	}

	try {
		const formation = await createFormationInDB(
			header,
			school,
			startedYear,
			endedYear,
			parsedContent,
		);

		return res.status(200).json(formation);
	} catch (error) {
		return res.status(500).json({
			error: {
				message: error,
				code: 500,
			},
		});
	}
};

const updateFormation = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { id } = req.params;
	const { header, school, startedYear, endedYear, content } = req.body;

	if (!token || !(await verifyToken(token))) {
		return res.status(401).json({
			error: {
				message: 'A valid token is required to update an experience',
				code: 401,
			},
		});
	}

	if (!header || !school || !startedYear || !endedYear || !content) {
		return res.status(404).json({
			error: {
				message:
					'One or multiple parameters is missing in request body',
				code: 404,
			},
		});
	}

	let parsedContent;
	try {
		parsedContent = JSON.parse(content);
	} catch {
		return res.status(500).json({
			message: 'Failed to parse content field.',
		});
	}

	try {
		const formation = await dbUpdateFormation(
			id,
			header,
			school,
			startedYear,
			endedYear,
			parsedContent,
		);

		console.log(formation);

		return res.status(200).json(formation);
	} catch (error) {
		return res.status(500).json({
			error: {
				message: error,
				code: 500,
			},
		});
	}
};

const deleteFormation = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { id } = req.params;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to delete an experience.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(401).json({
			message: 'Provided token not found.',
		});
	}

	try {
		await dbDeleteFormation(id);

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

export { getFormations, postFormation, updateFormation, deleteFormation };

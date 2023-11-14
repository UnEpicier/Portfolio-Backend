// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import {
	createDbSkill,
	deleteDbSkill,
	getDbSkills,
	updateDbSkill,
} from './skill.controllers';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

export async function getSkills(req: Request, res: Response) {
	const dbSkills = await getDbSkills();

	if (!dbSkills.success) {
		return res.status(500).json({ message: dbSkills.message });
	}

	return res.status(200).json(dbSkills.skills);
}

export async function createSkill(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { name } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to create a skill.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found.',
		});
	}

	if (!name) {
		return res.status(400).json({
			message: 'Name field is missing in request body.',
		});
	}

	const createdSkill = await createDbSkill(name);

	if (!createdSkill.success) {
		return res.status(500).json({ message: createdSkill.message });
	}

	return res.status(200).json(createdSkill.skill);
}

export async function updateSkill(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { oldName, name } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to rename a skill.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found.',
		});
	}

	if (!oldName || !name) {
		return res.status(400).json({
			message: 'Either name or oldName field is missing in request body.',
		});
	}

	const updatedSkill = await updateDbSkill(oldName, name);

	if (!updatedSkill.success) {
		return res.status(500).json({ message: updatedSkill.message });
	}

	return res.status(200).json(updatedSkill.skill);
}

export async function deleteSkill(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { name } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to delete a skill.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found.',
		});
	}

	if (!name) {
		return res.status(400).json({
			message: 'Name field is missing in request body.',
		});
	}

	const deletedSkill = await deleteDbSkill(name);

	if (!deletedSkill.success) {
		return res.status(500).json({ message: deletedSkill.message });
	}

	return res.status(200).end();
}

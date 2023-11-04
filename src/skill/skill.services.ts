// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import { createDbSkill, getDbSkills, updateDbSkill } from './skill.controllers';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

export async function getSkills(req: Request, res: Response) {
	const dbSkills = await getDbSkills();

	return res.status(dbSkills.success ? 200 : 500).json(dbSkills);
}

export async function createSkill(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { name } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to create a skill.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Provided token not found.',
		});
	}

	if (!name) {
		return res.status(400).json({
			success: false,
			message: 'Name field is missing in request body.',
		});
	}

	const skillCreated = await createDbSkill(name);

	return res.status(skillCreated.success ? 200 : 500).json(skillCreated);
}

export async function updateSkill(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { oldName, name } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to rename a skill.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Provided token not found.',
		});
	}

	if (!oldName || !name) {
		return res.status(400).json({
			success: false,
			message: 'Either name or oldName field is missing in request body.',
		});
	}

	const skillUpdated = await updateDbSkill(oldName, name);

	return res.status(skillUpdated.success ? 200 : 500).json(skillUpdated);
}

export async function deleteSkill(req: Request, res: Response) {}

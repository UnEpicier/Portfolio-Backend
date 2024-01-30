// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import {
	getSkillsInDB,
	createSkillInDB,
	updateSkillInDB,
	deleteSkillInDB,
} from './skill.services';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

const getSkills = async (_: Request, res: Response) => {
	const dbSkills = await getSkillsInDB();

	if (!dbSkills.success) {
		return res.status(500).json({ message: dbSkills.message });
	}

	return res.status(200).json(dbSkills.skills);
};

const createSkill = async (req: Request, res: Response) => {
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
			message: 'One parameter missing in request body.',
		});
	}

	const createdSkill = await createSkillInDB(name);

	if (!createdSkill.success) {
		return res.status(500).json({ message: createdSkill.message });
	}

	return res.status(200).json(createdSkill.skill);
};

const updateSkill = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { id, name } = req.body;

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

	if (!id || !name) {
		return res.status(400).json({
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const updatedSkill = await updateSkillInDB(id, name);

	if (!updatedSkill.success) {
		return res.status(500).json({ message: updatedSkill.message });
	}

	return res.status(200).json(updatedSkill.skill);
};

const deleteSkill = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { id } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to delete a skill.',
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

	const deletedSkill = await deleteSkillInDB(id);

	if (!deletedSkill.success) {
		return res.status(500).json({ message: deletedSkill.message });
	}

	return res.status(200).end();
};

export { getSkills, createSkill, updateSkill, deleteSkill };

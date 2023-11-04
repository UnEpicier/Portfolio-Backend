// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import { getDbSkill } from './skill.controllers';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

export async function getSkills(req: Request, res: Response) {
	const dbSkills = await getDbSkill();

	return res.status(dbSkills.success ? 200 : 500).json(dbSkills);
}

export async function createSkill(req: Request, res: Response) {}

export async function updateSkill(req: Request, res: Response) {}

export async function deleteSkill(req: Request, res: Response) {}
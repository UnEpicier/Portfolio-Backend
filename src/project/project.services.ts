// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import {
	dbGetProjects,
	dbRefreshProjects,
	dbDeleteProject,
} from './project.controllers';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

export async function getProjects(req: Request, res: Response) {
	const dbProjects = await dbGetProjects();

	return res.status(dbProjects.success ? 200 : 500).json(dbProjects);
}

export async function refreshProjects(req: Request, res: Response) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to refresh projects.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Invalid authorization token.',
		});
	}

	const projectsRefreshed = await dbRefreshProjects();

	return res
		.status(projectsRefreshed.success ? 200 : 500)
		.json(projectsRefreshed);
}

export async function deleteProject(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { id } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to delete a project.',
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

	const projectDeleted = await dbDeleteProject(id);

	return res.status(projectDeleted.success ? 200 : 500).json(projectDeleted);
}

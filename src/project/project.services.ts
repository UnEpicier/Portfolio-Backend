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

	if (!dbProjects.success) {
		return res.status(500).json(dbProjects.message);
	}

	return res.status(200).json(dbProjects.projects);
}

export async function refreshProjects(req: Request, res: Response) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to refresh projects.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Invalid authorization token.',
		});
	}

	const projectsRefreshed = await dbRefreshProjects();

	if (!projectsRefreshed.success) {
		return res.status(500).json(projectsRefreshed.message);
	}

	return res.status(200).json(projectsRefreshed.projects);
}

export async function deleteProject(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { id } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to delete a project.',
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

	const deletedProject = await dbDeleteProject(id);

	if (deletedProject.success) {
		return res.status(500).json(deletedProject.message);
	}

	return res.status(200).end();
}

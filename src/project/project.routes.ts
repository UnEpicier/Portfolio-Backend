// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Router } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Services -------------------------------------------------------
import {
	getProjects,
	refreshProjects,
	deleteProject,
} from './project.services';
// ---------------------------------------------------------------------------------------------------------------------

const router = Router();

router.get('/projects', async (req, res) => {
	await getProjects(req, res);
});

router.patch('/projects', async (req, res) => {
	await refreshProjects(req, res);
});

router.delete('/project', async (req, res) => {
	await deleteProject(req, res);
});

export default router;

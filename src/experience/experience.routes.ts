// ----------------------------------------------------- Express -------------------------------------------------------
import { Router } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Services -------------------------------------------------------
import {
	getExperiences,
	postExperience,
	updateExperience,
	deleteExperience,
} from './experience.services';
// ---------------------------------------------------------------------------------------------------------------------

const router = Router();

router.get('/experiences', async (req, res) => {
	await getExperiences(req, res);
});

router.post('/experience', async (req, res) => {
	await postExperience(req, res);
});

router.put('/experience', async (req, res) => {
	await updateExperience(req, res);
});

router.delete('/experience', async (req, res) => {
	await deleteExperience(req, res);
});

export default router;

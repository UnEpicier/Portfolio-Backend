// ----------------------------------------------------- Express -------------------------------------------------------
import { Router } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Services -------------------------------------------------------
import {
	getFormations,
	postFormation,
	updateFormation,
	deleteFormation,
} from './formation.services';
// ---------------------------------------------------------------------------------------------------------------------

const router = Router();

router.get('/formations', async (req, res) => {
	await getFormations(req, res);
});

router.post('/formation', async (req, res) => {
	await postFormation(req, res);
});

router.put('/formation', async (req, res) => {
	await updateFormation(req, res);
});

router.delete('/formation', async (req, res) => {
	await deleteFormation(req, res);
});

export default router;

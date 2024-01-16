// ----------------------------------------------------- Express -------------------------------------------------------
import { Router } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Services -------------------------------------------------------
import {
	getFormations,
	postFormation,
	updateFormation,
	deleteFormation,
} from './formation.controllers';
// ---------------------------------------------------------------------------------------------------------------------

const router = Router();

router.get('/formations', getFormations);

router.post('/formation', postFormation);

router.put('/formation/:id', updateFormation);

router.delete('/formation/:id', deleteFormation);

export default router;

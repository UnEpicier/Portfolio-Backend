// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Router } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Services -------------------------------------------------------
import { getAbout, putDescription, putImage } from './about.services';
// ---------------------------------------------------------------------------------------------------------------------

const router = Router();

router.get('/about', async (req, res) => {
	await getAbout(req, res);
});

router.put('/about/description', async (req, res) => {
	await putDescription(req, res);
});

router.put('/about/image', async (req, res) => {
	await putImage(req, res);
});

export default router;
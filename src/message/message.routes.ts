// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Router } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Services -------------------------------------------------------
import { getMessages, postMessage, deleteMessage } from './message.services';
// ---------------------------------------------------------------------------------------------------------------------

const router = Router();

router.get('/messages', async (req, res) => {
	await getMessages(req, res);
});

router.post('/message', async (req, res) => {
	await postMessage(req, res);
});

router.delete('/message', async (req, res) => {
	await deleteMessage(req, res);
});

export default router;

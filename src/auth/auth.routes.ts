// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Router } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Services -------------------------------------------------------
import {
	checkToken,
	signIn,
	signUp,
	changePassword,
	changeEmail,
	signOut,
	deletedAccount,
} from './auth.services';
// ---------------------------------------------------------------------------------------------------------------------

const router = Router();

router.get('/auth', async (req, res) => {
	await checkToken(req, res);
});

router.post('/auth/signin', async (req, res) => {
	await signIn(req, res);
});

router.post('/auth/signup', async (req, res) => {
	await signUp(req, res);
});

router.put('/auth/password', async (req, res) => {
	await changePassword(req, res);
});

router.put('/auth/email', async (req, res) => {
	await changeEmail(req, res);
});

router.delete('/auth/signout', async (req, res) => {
	await signOut(req, res);
});

router.delete('/auth/delete', async (req, res) => {
	await deletedAccount(req, res);
});

export default router;

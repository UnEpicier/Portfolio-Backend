// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Router } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

import {
	getCategories,
	getPosts,
	postCategory,
	postPost,
	putCategory,
	putPost,
	deleteCategory,
	deletePost,
} from './blog.services';

const router = Router();

router.get('/blog/categories', async (req, res) => {
	await getCategories(req, res);
});

router.get('/blog/posts', async (req, res) => {
	await getPosts(req, res);
});

router.post('/blog/category', async (req, res) => {
	await postCategory(req, res);
});

router.post('/blog/post', async (req, res) => {
	await postPost(req, res);
});

router.put('/blog/category', async (req, res) => {
	await putCategory(req, res);
});

router.put('/blog/post', async (req, res) => {
	await putPost(req, res);
});

router.delete('/blog/category', async (req, res) => {
	await deleteCategory(req, res);
});

router.delete('/blog/post', async (req, res) => {
	await deletePost(req, res);
});

export default router;

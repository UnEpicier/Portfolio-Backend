// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import {
	dbGetCategories,
	dbGetPosts,
	dbPostCategory,
	dbPostPost,
	dbUpdateCategory,
	dbUpdatePost,
	dbDeleteCategory,
	dbDeletePost,
} from './blog.controllers';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from 'src/utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

export const getCategories = async (req: Request, res: Response) => {
	const dbCategories = await dbGetCategories();

	if (!dbCategories.success) {
		return res.status(500).json({ message: dbCategories.message });
	}

	return res.status(200).json(dbCategories.categories);
};

export const getPosts = async (req: Request, res: Response) => {
	const dbPosts = await dbGetPosts();

	if (!dbPosts.success) {
		return res.status(500).json({ message: dbPosts.message });
	}

	return res.status(200).json(dbPosts.posts);
};

export const postCategory = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { name, description, image } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to post a category.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found.',
		});
	}

	if (!name || !description || !image) {
		return res.status(401).json({
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const dbCategory = await dbPostCategory(name, description, image);

	if (!dbCategory.success) {
		return res.status(500).json({ message: dbCategory.message });
	}

	return res.status(200).json(dbCategory.category);
};

export const postPost = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { title, content, category } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to post a post.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found.',
		});
	}

	if (!title || !content || !category) {
		return res.status(401).json({
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const dbPost = await dbPostPost(title, content, category);

	if (!dbPost.success) {
		return res.status(500).json({ message: dbPost.message });
	}

	return res.status(200).json(dbPost.post);
};

export const putCategory = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { id, name, description, image } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to update a category.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found.',
		});
	}

	if (!id || !name || !description || !image) {
		return res.status(401).json({
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const dbCategory = await dbUpdateCategory(id, name, description, image);

	if (!dbCategory.success) {
		return res.status(500).json({ message: dbCategory.message });
	}

	return res.status(200).json(dbCategory.category);
};

export const putPost = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { id, title, content, category } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to update a post.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found.',
		});
	}

	if (!id || !title || !content || !category) {
		return res.status(401).json({
			message: 'One or multiple parameters is missing in request body.',
		});
	}

	const dbPost = await dbUpdatePost(id, title, content, category);

	if (!dbPost.success) {
		return res.status(500).json({ message: dbPost.message });
	}

	return res.status(200).json(dbPost.post);
};

export const deleteCategory = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { id } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to delete a category.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found.',
		});
	}

	if (!id) {
		return res.status(401).json({
			message: 'One parameter is missing in request body.',
		});
	}

	const dbCategory = await dbDeleteCategory(id);

	if (!dbCategory.success) {
		return res.status(500).json({ message: dbCategory.message });
	}

	return res.status(200).end();
};

export const deletePost = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	const { id } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to delete a post.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found.',
		});
	}

	if (!id) {
		return res.status(401).json({
			message: 'One parameter is missing in request body.',
		});
	}

	const dbPost = await dbDeletePost(id);

	if (!dbPost.success) {
		return res.status(500).json({ message: dbPost.message });
	}

	return res.status(200).end();
};

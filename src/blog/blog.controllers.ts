// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- DotEnv --------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { connectToDB } from 'src/utils/database';
import Category from 'src/models/category';
import Post from 'src/models/post';
// ---------------------------------------------------------------------------------------------------------------------

export const dbGetCategories = async () => {
	try {
		await connectToDB();

		return {
			success: true,
			categories: await Category.find({}),
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to get categories.',
		};
	}
};

export const dbGetPosts = async (categoryId: string) => {
	try {
		await connectToDB();

		const posts = (
			await Post.find({
				category: categoryId,
			}).populate('category')
		).sort((a, b) => {
			return b.createdAt.getTime() - a.createdAt.getTime();
		});

		return {
			success: true,
			posts: posts,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to get posts.',
		};
	}
};

export const dbPostCategory = async (
	name: string,
	description: string,
	image: string,
) => {
	try {
		await connectToDB();

		await Category.create({
			name,
			description,
			image,
		});

		return {
			success: true,
			category: await Category.findOne({
				name,
				description,
				image,
			}),
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to post category.',
		};
	}
};

export const dbPostPost = async (
	title: string,
	content: string,
	category: string,
) => {
	try {
		await connectToDB();

		await Post.create({
			title,
			content,
			category,
		});

		return {
			success: true,
			post: await Post.findOne({
				title,
				content,
				category,
			}).populate('category'),
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to post post.',
		};
	}
};

export const dbUpdateCategory = async (
	id: number,
	name: string,
	description: string,
	image: string,
) => {
	try {
		await connectToDB();

		await Category.updateOne(
			{
				_id: id,
			},
			{
				name,
				description,
				image,
			},
		);

		return {
			success: true,
			category: await Category.findOne({
				_id: id,
			}),
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to update category.',
		};
	}
};

export const dbUpdatePost = async (
	id: number,
	title: string,
	content: string,
	category: string,
) => {
	try {
		await connectToDB();

		await Post.updateOne(
			{
				_id: id,
			},
			{
				title,
				content,
				category,
			},
		);

		return {
			success: true,
			post: await Post.findOne({
				_id: id,
			}).populate('category'),
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to update post.',
		};
	}
};

export const dbDeleteCategory = async (id: number) => {
	try {
		await connectToDB();

		await Category.deleteOne({
			_id: id,
		});

		return {
			success: true,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to delete category.',
		};
	}
};

export const dbDeletePost = async (id: number) => {
	try {
		await connectToDB();

		await Post.deleteOne({
			_id: id,
		});

		return {
			success: true,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to delete post.',
		};
	}
};

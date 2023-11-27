// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { Schema, model, models } from 'mongoose';
// ---------------------------------------------------------------------------------------------------------------------

const PostSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: Object,
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Post = models.Post || model('Post', PostSchema);

export interface Post {
	name: string;
	content: Object;
	category: string;
	createdAt: Date;
	updatedAt: Date;
}

export default Post;

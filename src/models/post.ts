// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { Schema, model, models } from 'mongoose';
// ---------------------------------------------------------------------------------------------------------------------

const PostSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
});

const Post = models.Post || model('Post', PostSchema);

export interface Post {
	name: string;
	content: string;
}

export default Post;

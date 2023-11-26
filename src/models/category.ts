// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { Schema, model, models } from 'mongoose';
// ---------------------------------------------------------------------------------------------------------------------

const CategorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Category = models.Category || model('Category', CategorySchema);

export interface Category {
	name: string;
	description: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
}

export default Category;

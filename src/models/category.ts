// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { Schema, model, models } from 'mongoose';
// ---------------------------------------------------------------------------------------------------------------------

const CategorySchema = new Schema({
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
});

const Category = models.Category || model('Category', CategorySchema);

export interface Category {
	name: string;
	description: string;
	image: string;
}

export default Category;

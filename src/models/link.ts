// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Sequelize ------------------------------------------------------
import { Schema, model, models } from 'mongoose';
// ---------------------------------------------------------------------------------------------------------------------

const LinkSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
});

const Link = models.Link || model('Link', LinkSchema);

export interface ILink {
	name: string;
	icon: string;
	color: string;
	link: string;
}

export default Link;

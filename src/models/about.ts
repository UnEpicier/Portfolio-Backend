// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { Schema, model, models } from 'mongoose';
// ---------------------------------------------------------------------------------------------------------------------

const AboutSchema = new Schema({
	image: {
		type: String,
		required: true,
		default: 'https://placehold.co/600x600',
	},
	description: {
		type: String,
		required: true,
	},
});

const About = models.About || model('About', AboutSchema);

export interface IAbout {
	image: string;
	description: string;
}

export default About;

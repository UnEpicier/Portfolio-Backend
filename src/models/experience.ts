// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Sequelize ------------------------------------------------------
import { Schema, model, models } from 'mongoose';
// ---------------------------------------------------------------------------------------------------------------------

const ExperienceSchema = new Schema({
	header: {
		type: String,
		required: true,
	},
	society: {
		type: String,
		required: true,
	},
	startedYear: {
		type: Number,
		default: new Date().getFullYear,
	},
	endedYear: {
		type: Number,
		default: new Date().getFullYear,
	},
	content: {
		type: Array<String>,
		required: true,
	},
});

const Experience = models.Experience || model('Experience', ExperienceSchema);

export interface IExperience {
	header: string;
	society: string;
	startedYear: number;
	endedYear: number;
	content: string;
}

export default Experience;

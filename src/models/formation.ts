// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Sequelize ------------------------------------------------------
import { Schema, model, models } from 'mongoose';
// ---------------------------------------------------------------------------------------------------------------------

const FormationSchema = new Schema({
	header: {
		type: String,
		required: true,
	},
	school: {
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

const Formation = models.Formation || model('Formation', FormationSchema);

export interface IFormation {
	header: string;
	society: string;
	startedYear: number;
	endedYear: number;
	content: string;
}

export default Formation;

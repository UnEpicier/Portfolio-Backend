// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Sequelize ------------------------------------------------------
import { Schema, model, models } from 'mongoose';
// ---------------------------------------------------------------------------------------------------------------------

const ProjectSchema = new Schema({
	ownerName: {
		type: String,
		required: true,
	},
	ownerImage: {
		type: String,
		required: true,
	},
	ownerUrl: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	stars: {
		type: Number,
		required: true,
	},
	forks: {
		type: Number,
		required: true,
	},
	topics: {
		type: Array<String>,
		required: true,
	},
	license: {
		type: String,
		default: null,
	},
	url: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
	},
	updatedAt: {
		type: Date,
		required: true,
	},
});

const Project = models.Project || model('Project', ProjectSchema);

export interface IProject {
	ownerName: string;
	ownerImage: string;
	ownerUrl: string;
	name: string;
	description: string;
	stars: string;
	forks: string;
	topics: string[] | string;
	license?: string;
	url: string;
	createdAt: Date;
	updatedAt: Date;
}

export default Project;

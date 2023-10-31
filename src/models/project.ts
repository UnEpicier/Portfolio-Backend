// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Sequelize ------------------------------------------------------
import { Sequelize, DataTypes } from 'sequelize';
// ---------------------------------------------------------------------------------------------------------------------

export function defineModelProject(db: Sequelize) {
	return db.define('project', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: '',
		},
		stars: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		forks: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		tags: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: '[]',
		},
		license: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: null,
		},
		link: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
		},
	});
}

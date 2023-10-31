// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Sequelize ------------------------------------------------------
import { Sequelize, DataTypes } from 'sequelize';
// ---------------------------------------------------------------------------------------------------------------------

export function defineModelFormation(db: Sequelize) {
	return db.define('formation', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		image: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		header: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		school: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		startedYear: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		endedYear: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: "Aujourd'hui",
		},
		content: {
			type: DataTypes.TEXT,
			defaultValue: '[]',
			allowNull: false,
		},
	});
}

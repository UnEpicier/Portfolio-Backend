// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Sequelize ------------------------------------------------------
import { Sequelize, DataTypes } from 'sequelize';
// ---------------------------------------------------------------------------------------------------------------------

export function defineModelLink(db: Sequelize) {
	return db.define('link', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		icon: {
			type: DataTypes.TEXT,
			defaultValue: 'default',
			allowNull: false,
		},
		link: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});
}

// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Sequelize ------------------------------------------------------
import { Sequelize, DataTypes } from 'sequelize';
// ---------------------------------------------------------------------------------------------------------------------

export function defineModelAbout(db: Sequelize) {
	return db.define('about', {
		image: {
			type: DataTypes.TEXT,
			defaultValue: 'about/default.png',
			allowNull: false,
			primaryKey: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: false,
		},
	});
}

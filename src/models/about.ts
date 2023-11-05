// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Sequelize ------------------------------------------------------
import {
	Sequelize,
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
// ---------------------------------------------------------------------------------------------------------------------

// Create/Update the about table
// const dbConn = new Sequelize({
// 	dialect: 'sqlite',
// 	storage: `${process.cwd()}/databases/general.db`,
// 	logging: false,
// });
// const model = defineModelAbout(dbConn);
// model.sync({ alter: true });

class About extends Model<
	InferAttributes<About>,
	InferCreationAttributes<About>
> {
	declare image: string;
	declare description: string;
}

export function defineModelAbout(db: Sequelize) {
	return db.define<About>('about', {
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

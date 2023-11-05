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

// Create/Update the links table
// const dbConn = new Sequelize({
// 	dialect: 'sqlite',
// 	storage: `${process.cwd()}/databases/general.db`,
// 	logging: false,
// });
// const model = defineModelFormation(dbConn);
// model.sync({ alter: true });

class Formation extends Model<
	InferAttributes<Formation>,
	InferCreationAttributes<Formation>
> {
	declare id: CreationOptional<number>;
	declare header: string;
	declare school: string;
	declare startedYear: string;
	declare endedYear: string;
	declare content: string;
}

export function defineModelFormation(db: Sequelize) {
	return db.define<Formation>('formation', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
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

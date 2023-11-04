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
// const model = defineModelLink(dbConn);
// model.sync({ alter: true });

class Link extends Model<InferAttributes<Link>, InferCreationAttributes<Link>> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare icon: string;
	declare color: string;
	declare link: string;
}

export function defineModelLink(db: Sequelize) {
	return db.define<Link>('link', {
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
		color: {
			type: DataTypes.TEXT,
			defaultValue: '#000000',
			allowNull: false,
		},
		link: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});
}

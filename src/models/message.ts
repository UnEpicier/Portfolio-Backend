// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Sequelize ------------------------------------------------------
import {
	Sequelize,
	DataTypes,
	InferCreationAttributes,
	InferAttributes,
	CreationOptional,
	Model,
} from 'sequelize';
// ---------------------------------------------------------------------------------------------------------------------

// Create/Update the links table
// const dbConn = new Sequelize({
// 	dialect: 'sqlite',
// 	storage: `${process.cwd()}/databases/general.db`,
// 	logging: false,
// });
// const model = defineModelMessage(dbConn);
// model.sync({ alter: true });

class Message extends Model<
	InferAttributes<Message>,
	InferCreationAttributes<Message>
> {
	declare id: CreationOptional<number>;
	declare lastName: string;
	declare firstName: string;
	declare email: string;
	declare header: string;
	declare content: string;
}

export function defineModelMessage(db: Sequelize) {
	return db.define<Message>('message', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		lastName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		firstName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		header: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});
}

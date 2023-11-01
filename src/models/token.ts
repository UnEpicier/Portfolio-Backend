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

// Create/Update the token table
// const dbConn = new Sequelize({
// 	dialect: 'sqlite',
// 	storage: `${process.cwd()}/databases/general.db`,
// 	logging: false,
// });
// const model = defineModelToken(dbConn);
// model.sync({ alter: true });

class Token extends Model<
	InferAttributes<Token>,
	InferCreationAttributes<Token>
> {
	declare token: string;
	declare userId: number;
	declare createdAt: CreationOptional<Date>;
}

export function defineModelToken(db: Sequelize) {
	return db.define<Token>(
		'token',
		{
			token: {
				type: DataTypes.TEXT,
				allowNull: false,
				unique: true,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
			},
			createdAt: {
				type: DataTypes.TEXT,
				defaultValue: new Date().toISOString(),
			},
		},
		{
			updatedAt: false,
		},
	);
}

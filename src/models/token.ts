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
const dbConn = new Sequelize({
	dialect: 'sqlite',
	storage: `${process.cwd()}/databases/general.db`,
	logging: false,
});
const model = defineModelToken(dbConn);
model.sync({ alter: true });

console.log('Token table created/updated.');

class Token extends Model<
	InferAttributes<Token>,
	InferCreationAttributes<Token>
> {
	declare token: string;
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
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(),
			},
		},
		{
			updatedAt: false,
		},
	);
}

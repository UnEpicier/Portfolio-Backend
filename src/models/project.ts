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
// const model = defineModelProject(dbConn);
// model.sync({ alter: true });

class Project extends Model<
	InferAttributes<Project>,
	InferCreationAttributes<Project>
> {
	declare id: CreationOptional<number>;
	declare ownerName: string;
	declare ownerImage: string;
	declare ownerUrl: string;
	declare name: string;
	declare description: string;
	declare stars: number;
	declare forks: number;
	declare topics: string;
	declare license: string | null;
	declare link: string;
	declare createdAt: string;
	declare updatedAt: string;
}

export function defineModelProject(db: Sequelize) {
	return db.define<Project>('project', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		ownerName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		ownerImage: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		ownerUrl: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
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
		topics: {
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
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	});
}

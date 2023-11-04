// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- DotEnv --------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();

// ----------------------------------------------- Sequelize & Models --------------------------------------------------
import { Sequelize } from 'sequelize';
import { defineModelSkill } from '../models/skill';
// ---------------------------------------------------------------------------------------------------------------------

export async function getDbSkills() {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const skillToken = defineModelSkill(dbConn);

	const dbSkills = await skillToken.findAll();

	if (!dbSkills) {
		return {
			success: false,
			message: "Can't find skills in database.",
		};
	}

	return {
		success: true,
		message: 'Successfully getted skills',
		skills: dbSkills,
	};
}

export async function createDbSkill(name: string) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});

	const skillModel = defineModelSkill(dbConn);

	try {
		skillModel.create({
			name: name,
		});
	} catch {
		return {
			success: false,
			message: `Can't create ${name} skill.`,
		};
	}

	return {
		success: true,
		message: `Successfully created ${name} skill.`,
	};
}

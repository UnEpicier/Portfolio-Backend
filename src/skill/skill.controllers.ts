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

export async function getDbSkill() {
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

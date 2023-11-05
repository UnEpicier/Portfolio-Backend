// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- DotEnv --------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------- Sequelize & Models --------------------------------------------------
import { Sequelize } from 'sequelize';
import { defineModelExperience } from 'src/models/experience';
// ---------------------------------------------------------------------------------------------------------------------

export async function dbGetExperiences() {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});

	const experienceModel = defineModelExperience(dbConn);

	const dbExperiences = await experienceModel.findAll();

	if (!dbExperiences) {
		return {
			success: false,
			message: "Can't get experiences.",
		};
	}

	return {
		success: true,
		message: 'Successfully getted experiences.',
		experiences: dbExperiences,
	};
}

export async function dbPostExperience(
	header: string,
	society: string,
	startedYear: string,
	endedYear: string,
	content: string,
) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});

	const experienceModel = defineModelExperience(dbConn);

	try {
		await experienceModel.create({
			header: header,
			society: society,
			startedYear: startedYear,
			endedYear: endedYear != '' ? endedYear : "Aujourd'hui",
			content: content,
		});
	} catch {
		return {
			success: false,
			message: "Can't create experience.",
		};
	}

	return {
		success: true,
		message: 'Successfully created experience.',
	};
}

export async function dbUpdateExperience(
	id: number,
	header: string,
	society: string,
	startedYear: string,
	endedYear: string | null,
	content: string,
) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});

	const experienceModel = defineModelExperience(dbConn);

	try {
		await experienceModel.update(
			{
				header: header,
				society: society,
				startedYear: startedYear,
				endedYear: endedYear ?? "Aujourd'hui",
				content: content,
			},
			{
				where: {
					id: id,
				},
			},
		);
	} catch {
		return {
			success: false,
			message: "Can't update experience.",
		};
	}

	return {
		success: true,
		message: 'Successfully updated experience.',
	};
}

export async function dbDeleteExperience(id: number) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});

	const experienceModel = defineModelExperience(dbConn);

	try {
		await experienceModel.destroy({
			where: {
				id: id,
			},
		});
	} catch {
		return {
			success: false,
			message: "Can't delete experience.",
		};
	}

	return {
		success: true,
		message: 'Successfully deleted experience.',
	};
}

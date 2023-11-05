// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- DotEnv --------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------- Sequelize & Models --------------------------------------------------
import { Sequelize } from 'sequelize';
import { defineModelFormation } from 'src/models/formation';
// ---------------------------------------------------------------------------------------------------------------------

export async function dbGetFormations() {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});

	const formationModel = defineModelFormation(dbConn);

	const dbExperiences = await formationModel.findAll();

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

export async function dbPostFormation(
	header: string,
	school: string,
	startedYear: string,
	endedYear: string,
	content: string,
) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});

	const formationModel = defineModelFormation(dbConn);

	try {
		await formationModel.create({
			header: header,
			school: school,
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

export async function dbUpdateFormation(
	id: number,
	header: string,
	school: string,
	startedYear: string,
	endedYear: string | null,
	content: string,
) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});

	const formationModel = defineModelFormation(dbConn);

	try {
		await formationModel.update(
			{
				header: header,
				school: school,
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

export async function dbDeleteFormation(id: number) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});

	const formationModel = defineModelFormation(dbConn);

	try {
		await formationModel.destroy({
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

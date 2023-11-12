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

	const dbFormations = await formationModel.findAll();

	if (!dbFormations) {
		return {
			success: false,
			message: "Can't get formations.",
		};
	}

	return {
		success: true,
		message: 'Successfully getted formations.',
		formations: dbFormations,
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
			message: "Can't create formation.",
		};
	}

	return {
		success: true,
		message: 'Successfully created formation.',
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
			message: "Can't update formation.",
		};
	}

	return {
		success: true,
		message: 'Successfully updated formation.',
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
			message: "Can't delete formation.",
		};
	}

	return {
		success: true,
		message: 'Successfully deleted formation.',
	};
}

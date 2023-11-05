// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- DotEnv --------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------- Sequelize & Models --------------------------------------------------
import { Sequelize } from 'sequelize';
import { defineModelAbout } from 'src/models/about';
// ---------------------------------------------------------------------------------------------------------------------

export async function dbGetAbout() {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});

	const aboutModel = defineModelAbout(dbConn);

	const abouts = await aboutModel.findAll();

	if (!abouts) {
		return {
			success: false,
			message: "Can't get about informations.",
		};
	}

	return {
		success: true,
		message: 'Successfully getted about informations.',
		about: abouts,
	};
}

export async function dbPutDescription(description: string) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});

	const aboutModel = defineModelAbout(dbConn);

	try {
		await aboutModel.update(
			{
				description: description,
			},
			{
				where: {},
			},
		);
	} catch {
		return {
			success: false,
			message: "Can't update description.",
		};
	}

	return {
		success: true,
		message: 'Successfully updated description.',
	};
}

export async function dbPutImage(image: string) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});

	const aboutModel = defineModelAbout(dbConn);

	try {
		await aboutModel.update(
			{
				image: image,
			},
			{
				where: {},
			},
		);
	} catch {
		return {
			success: false,
			message: "Can't update image path.",
		};
	}

	return {
		success: true,
		message: 'Successfully updated image path.',
	};
}

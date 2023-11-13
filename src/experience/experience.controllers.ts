// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- DotEnv --------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { connectToDB } from 'src/utils/database';
import Experience from 'src/models/experience';
// ---------------------------------------------------------------------------------------------------------------------

export async function dbGetExperiences() {
	try {
		await connectToDB();

		return {
			success: true,
			experiences: await Experience.find({}),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to get experiences.',
		};
	}
}

export async function dbPostExperience(
	header: string,
	society: string,
	startedYear: string,
	endedYear: string,
	content: string,
) {
	try {
		await connectToDB();

		await Experience.create({
			header,
			society,
			startedYear,
			endedYear,
			content,
		});

		return {
			success: true,
			experience: await Experience.findOne({
				header,
				society,
				startedYear,
				endedYear,
				content,
			}),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to create experience.',
		};
	}
}

export async function dbUpdateExperience(
	id: number,
	header: string,
	society: string,
	startedYear: string,
	endedYear: string | null,
	content: string,
) {
	try {
		await connectToDB();

		await Experience.updateOne(
			{
				_id: id,
			},
			{
				header,
				society,
				startedYear,
				endedYear,
				content,
			},
		);

		return {
			success: true,
			experience: await Experience.findById({ _id: id }),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to edit experience',
		};
	}
}

export async function dbDeleteExperience(id: number) {
	try {
		await connectToDB();

		await Experience.deleteOne({
			_id: id,
		});

		return {
			success: true,
		};
	} catch {
		return {
			success: false,
			message: 'Failed to delete experience.',
		};
	}
}

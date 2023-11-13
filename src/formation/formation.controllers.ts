// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { connectToDB } from 'src/utils/database';
import Formation from 'src/models/formation';
// ---------------------------------------------------------------------------------------------------------------------

export async function dbGetFormations() {
	try {
		await connectToDB();

		return {
			success: true,
			formations: await Formation.find({}),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to get formations.',
		};
	}
}

export async function dbPostFormation(
	header: string,
	school: string,
	startedYear: string,
	endedYear: string,
	content: string,
) {
	try {
		await connectToDB();

		await Formation.create({
			header,
			school,
			startedYear,
			endedYear,
			content,
		});

		return {
			success: true,
			formation: await Formation.findOne({
				header,
				school,
				startedYear,
				endedYear,
				content,
			}),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to create a formation.',
		};
	}
}

export async function dbUpdateFormation(
	id: number,
	header: string,
	school: string,
	startedYear: string,
	endedYear: string | null,
	content: string,
) {
	try {
		await connectToDB();

		await Formation.updateOne(
			{
				_id: id,
			},
			{
				header,
				school,
				startedYear,
				endedYear,
				content,
			},
		);

		return {
			success: true,
			formation: Formation.findById(id),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to edit formation.',
		};
	}
}

export async function dbDeleteFormation(id: number) {
	try {
		await connectToDB();

		await Formation.deleteOne({ _id: id });

		return {
			success: true,
		};
	} catch {
		return {
			success: false,
			message: 'Failed to delete formation.',
		};
	}
}

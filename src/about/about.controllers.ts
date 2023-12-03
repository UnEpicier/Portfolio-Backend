// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { connectToDB } from 'src/utils/database';
import About from 'src/models/about';
// ---------------------------------------------------------------------------------------------------------------------

export async function dbGetAbout() {
	try {
		await connectToDB();

		return {
			success: true,
			about: await About.findOne({}),
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to get about informations.',
		};
	}
}

export async function dbPutDescription(description: string) {
	try {
		await connectToDB();

		await About.updateOne(
			{},
			{
				description: description,
			},
		);

		return {
			success: true,
			about: await About.findOne({}),
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to edit description.',
		};
	}
}

export async function dbPutImage(image: string) {
	try {
		await connectToDB();

		await About.updateOne(
			{},
			{
				image: image,
			},
		);

		return {
			success: true,
			about: await About.findOne({}),
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to edit image path.',
		};
	}
}

// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { connectToDB } from 'src/utils/database';
import Formation, { IFormation } from 'src/models/formation';
// ---------------------------------------------------------------------------------------------------------------------

const getFormationsInDB = async (): Promise<IFormation[]> => {
	try {
		await connectToDB();

		return await Formation.find({});
	} catch (error) {
		console.error(error);

		throw new Error('Unable to get formations.');
	}
};

const createFormationInDB = async (
	header: string,
	school: string,
	startedYear: string,
	endedYear: string,
	content: Array<string>,
): Promise<IFormation | null> => {
	try {
		await connectToDB();

		await Formation.create({
			header,
			school,
			startedYear,
			endedYear,
			content,
		});

		return await Formation.findOne({
			header,
			school,
			startedYear,
			endedYear,
			content,
		});
	} catch (error) {
		console.error(error);

		throw new Error('Unable to create a new formation');
	}
};

const dbUpdateFormation = async (
	id: string,
	header: string,
	school: string,
	startedYear: string,
	endedYear: string | null,
	content: Array<string>,
): Promise<IFormation | null> => {
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

		return await Formation.findById(id);
	} catch (error) {
		console.error(error);

		throw new Error('Unable to update formation');
	}
};

const dbDeleteFormation = async (id: string): Promise<void> => {
	try {
		await connectToDB();

		await Formation.deleteOne({ _id: id });

		return;
	} catch (error) {
		console.error(error);

		throw new Error('Unable to delete formation');
	}
};

export {
	getFormationsInDB,
	createFormationInDB,
	dbUpdateFormation,
	dbDeleteFormation,
};

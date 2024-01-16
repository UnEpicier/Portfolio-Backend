// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { connectToDB } from 'src/utils/database';
import Link, { ILink } from 'src/models/link';
// ---------------------------------------------------------------------------------------------------------------------

const getLinksInDB = async (): Promise<ILink[]> => {
	try {
		await connectToDB();

		return await Link.find({});
	} catch (error) {
		console.error(error);

		throw new Error('Unable to get links');
	}
};

const createLinkInDB = async (
	name: string,
	icon: string,
	color: string,
	link: string,
): Promise<ILink | null> => {
	try {
		await connectToDB();

		await Link.create({
			name,
			icon,
			color,
			link,
		});

		return await Link.findOne({
			name,
			icon,
			color,
			link,
		});
	} catch (error) {
		console.error(error);

		throw new Error('Unable to create a new link');
	}
};

const updateLinkInDB = async (
	id: string,
	name: string,
	icon: string,
	color: string,
	link: string,
): Promise<ILink | null> => {
	try {
		await connectToDB();

		await Link.updateOne(
			{
				_id: id,
			},
			{
				name,
				icon,
				color,
				link,
			},
		);

		return await Link.findById(id);
	} catch (error) {
		console.error(error);

		throw new Error('Unable to update link');
	}
};

const deleteLinkInDB = async (id: string): Promise<void> => {
	try {
		await connectToDB();

		await Link.deleteOne({
			_id: id,
		});

		return;
	} catch (error) {
		console.error(error);

		throw new Error('Unable to delete link');
	}
};

export { getLinksInDB, createLinkInDB, updateLinkInDB, deleteLinkInDB };

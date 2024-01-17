// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { connectToDB } from 'src/utils/database';
import Message, { IMessage } from 'src/models/message';
// ---------------------------------------------------------------------------------------------------------------------

const getMessagesInDB = async (): Promise<IMessage[]> => {
	try {
		await connectToDB();

		return await Message.find({});
	} catch (error) {
		console.error(error);

		throw new Error('Unable to get messages');
	}
};

const createMessageInDB = async (
	firstname: string,
	lastname: string,
	email: string,
	header: string,
	content: string,
): Promise<IMessage | null> => {
	try {
		await connectToDB();

		await Message.create({
			firstname,
			lastname,
			email,
			header,
			content,
		});

		return await Message.findOne({
			firstname,
			lastname,
			email,
			header,
			content,
		});
	} catch (error) {
		console.error(error);

		throw new Error('Unable to create a new message');
	}
};

const deleteMessageInDB = async (id: string): Promise<void> => {
	try {
		await connectToDB();

		await Message.deleteOne({
			_id: id,
		});

		return;
	} catch (error) {
		console.error(error);

		throw new Error('Unable to delete the message');
	}
};

export { getMessagesInDB, createMessageInDB, deleteMessageInDB };

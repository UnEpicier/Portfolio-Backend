// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { connectToDB } from 'src/utils/database';
import Message from 'src/models/message';
// ---------------------------------------------------------------------------------------------------------------------

export async function dbGetMessages() {
	try {
		await connectToDB();

		return {
			success: true,
			messages: await Message.find({}),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to get messages.',
		};
	}
}

export async function dbPostMessage(
	firstname: string,
	lastname: string,
	email: string,
	header: string,
	content: string,
) {
	try {
		await connectToDB();

		await Message.create({
			firstname,
			lastname,
			email,
			header,
			content,
		});

		return {
			success: true,
			message: await Message.findOne({
				firstname,
				lastname,
				email,
				header,
				content,
			}),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to post message.',
		};
	}
}

export async function dbDeleteMessage(id: string) {
	try {
		await connectToDB();

		await Message.deleteOne({
			_id: id,
		});

		return {
			success: true,
		};
	} catch {
		return {
			success: false,
			message: 'Failed to delete message.',
		};
	}
}

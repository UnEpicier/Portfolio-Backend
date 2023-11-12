// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- DotEnv --------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();

// ----------------------------------------------- Sequelize & Models --------------------------------------------------
import { Sequelize } from 'sequelize';
import { defineModelMessage } from 'src/models/message';
// ---------------------------------------------------------------------------------------------------------------------

export async function dbGetMessages() {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const messageModel = defineModelMessage(dbConn);

	const dbMessages = await messageModel.findAll();

	if (!dbMessages) {
		return {
			success: false,
			message: "Can't get messages.",
		};
	}

	return {
		success: true,
		message: 'successfully getted messages.',
		messages: dbMessages,
	};
}

export async function dbPostMessage(
	firstName: string,
	lastName: string,
	email: string,
	header: string,
	content: string,
) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const messageModel = defineModelMessage(dbConn);

	try {
		await messageModel.create({
			firstName: firstName,
			lastName: lastName,
			email: email,
			header: header,
			content: content,
		});
	} catch {
		return {
			success: false,
			message: "Can't create the message.",
		};
	}

	return {
		success: true,
		message: 'Successfully created the message.',
	};
}

export async function dbDeleteMessage(id: string) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const messageModel = defineModelMessage(dbConn);

	try {
		await messageModel.destroy({
			where: {
				id: id,
			},
		});
	} catch {
		return {
			success: false,
			message: "Can't delete message.",
		};
	}

	return {
		success: false,
		message: 'Successfully deleted message.',
	};
}

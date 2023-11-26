// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { Schema, model, models } from 'mongoose';
// ---------------------------------------------------------------------------------------------------------------------

const MessageSchema = new Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		header: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Message = models.Message || model('Message', MessageSchema);

export interface IMessage {
	firstname: string;
	lastname: string;
	email: string;
	header: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
}

export default Message;

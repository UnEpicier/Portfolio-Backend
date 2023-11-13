// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Sequelize ------------------------------------------------------
import { Schema, model, models } from 'mongoose';
// ---------------------------------------------------------------------------------------------------------------------

const TokenSchema = new Schema(
	{
		token: {
			type: String,
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Token = models.Token || model('Token', TokenSchema);

export interface IToken {
	token: string;
	userId: number;
	createdAt: Date;
	updatedAt: Date;
}

export default Token;

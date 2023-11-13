// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import mongoose from 'mongoose';
// ---------------------------------------------------------------------------------------------------------------------

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI ?? '', {
			dbName: 'portfolio',
		});

		mongoose.Schema.Types.String.checkRequired((v) => v != null);

		isConnected = true;
	} catch (error) {
		console.error(error);
	}
};

// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import mongoose from 'mongoose';
// ---------------------------------------------------------------------------------------------------------------------

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	try {
		await mongoose.connect(process.env.MONGODB_URI ?? '', {
			dbName: 'portfolio',
		});

		mongoose.Schema.Types.String.checkRequired((v) => v != null);
	} catch (error) {
		console.error(error);
	}

	return mongoose;
};

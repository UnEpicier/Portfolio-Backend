// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import { Request, Response } from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Controllers -----------------------------------------------------
import { dbGetAbout, dbPutDescription, dbPutImage } from './about.controllers';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { verifyToken } from '../utils/auth';
// ---------------------------------------------------------------------------------------------------------------------

export async function getAbout(req: Request, res: Response) {
	const dbAbout = await dbGetAbout();

	return res.status(dbAbout.success ? 200 : 500).json(dbAbout);
}

export async function putDescription(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { description } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to change description.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Provided token not found.',
		});
	}

	if (!description) {
		return res.status(401).json({
			success: false,
			message: 'One parameter is missing in request body.',
		});
	}

	const descriptionUpdated = await dbPutDescription(description);

	res.status(descriptionUpdated.success ? 200 : 500).json(descriptionUpdated);
}

export async function putImage(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { image } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'A valid token is required to change the image.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			success: false,
			message: 'Provided token not found.',
		});
	}

	if (!image) {
		return res.status(401).json({
			success: false,
			message: 'One parameter is missing in request body.',
		});
	}

	const imageUpdated = await dbPutImage(image);

	return res.status(imageUpdated.success ? 200 : 500).json(imageUpdated);
}

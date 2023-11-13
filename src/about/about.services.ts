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

export async function getAbout(_: Request, res: Response) {
	const dbAbout = await dbGetAbout();

	if (!dbAbout.success) {
		return res.status(500).json(dbAbout.message);
	}

	return res.status(200).json(dbAbout.about);
}

export async function putDescription(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { description } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to change description.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found.',
		});
	}

	if (!description) {
		return res.status(401).json({
			message: 'One parameter is missing in request body.',
		});
	}

	const updatedDescription = await dbPutDescription(description);

	if (!updatedDescription.success) {
		return res.status(500).json(updatedDescription.message);
	}

	return res.status(200).json(updatedDescription.about);
}

export async function putImage(req: Request, res: Response) {
	const token = req.headers.authorization;
	const { image } = req.body;

	if (!token) {
		return res.status(401).json({
			message: 'A valid token is required to change the image.',
		});
	}

	if (!(await verifyToken(token))) {
		return res.status(404).json({
			message: 'Provided token not found.',
		});
	}

	if (!image) {
		return res.status(401).json({
			message: 'One parameter is missing in request body.',
		});
	}

	const updatedImage = await dbPutImage(image);

	if (!updatedImage.success) {
		return res.status(500).json(updatedImage.message);
	}

	return res.status(200).json(updatedImage.about);
}

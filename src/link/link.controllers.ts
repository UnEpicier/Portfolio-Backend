// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { connectToDB } from 'src/utils/database';
import Link from 'src/models/link';
// ---------------------------------------------------------------------------------------------------------------------

export async function dbGetLinks() {
	try {
		await connectToDB();

		return {
			success: true,
			links: await Link.find({}),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to get links.',
		};
	}
}

export async function dbCreateLink(
	name: string,
	icon: string,
	color: string,
	link: string,
) {
	try {
		await connectToDB();

		await Link.create({
			name,
			icon,
			color,
			link,
		});

		return {
			success: true,
			link: await Link.findOne({
				name,
				icon,
				color,
				link,
			}),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to create link.',
		};
	}
}

export async function dbUpdateLink(
	name: string,
	icon: string,
	color: string,
	link: string,
) {
	try {
		await connectToDB();

		await Link.updateOne(
			{
				$or: [{ name }, { icon }, { color }, { link }],
			},
			{
				name,
				icon,
				color,
				link,
			},
		);

		return {
			success: true,
			link: await Link.findOne({
				name,
				icon,
				color,
				link,
			}),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to edit link.',
		};
	}
}

export async function dbDeleteLink(id: number) {
	try {
		await connectToDB();

		await Link.deleteOne({
			_id: id,
		});

		return {
			success: true,
		};
	} catch {
		return {
			success: false,
			message: 'Failed to delete link.',
		};
	}
}

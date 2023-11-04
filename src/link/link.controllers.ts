// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- DotEnv --------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();

// ----------------------------------------------- Sequelize & Models --------------------------------------------------
import { Op, Sequelize } from 'sequelize';
import { defineModelLink } from 'src/models/link';
// ---------------------------------------------------------------------------------------------------------------------

export async function dbGetLinks() {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const linkModel = defineModelLink(dbConn);

	const dbLinks = await linkModel.findAll();

	if (!dbLinks) {
		return {
			success: false,
			message: "Can't get links.",
		};
	}

	return {
		success: true,
		message: 'Successfully getted links',
		links: dbLinks,
	};
}

export async function dbCreateLink(
	name: string,
	icon: string,
	color: string,
	link: string,
) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const linkModel = defineModelLink(dbConn);

	try {
		await linkModel.create({
			name: name,
			icon: icon,
			color: color,
			link: link,
		});
	} catch {
		return {
			success: false,
			message: `Can't create ${name} link.`,
		};
	}

	return {
		success: true,
		message: `Successfully created ${name} link.`,
	};
}

export async function dbUpdateLink(
	name: string,
	icon: string,
	color: string,
	link: string,
) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const linkModel = defineModelLink(dbConn);

	const dbLink = await linkModel.findOne({
		where: {
			[Op.or]: [
				{ name: name },
				{ icon: icon },
				{ color: color },
				{ link: link },
			],
		},
	});

	if (!dbLink) {
		return {
			success: false,
			message: `Can't find the link.`,
		};
	}

	if (
		name == dbLink.name &&
		icon == dbLink.icon &&
		color == dbLink.color &&
		link == dbLink.link
	) {
		return {
			success: false,
			message:
				'Requested update parameters are the same as the actual values.',
		};
	}

	try {
		await linkModel.update(
			{
				name: name,
				icon: icon,
				color: color,
				link: link,
			},
			{
				where: {
					id: dbLink.id,
				},
			},
		);
	} catch {
		return {
			success: false,
			message: `Can't update the link.`,
		};
	}

	return {
		success: true,
		message: `Successfuly updated ${name} link.`,
	};
}

export async function dbDeleteLink(id: number) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const linkModel = defineModelLink(dbConn);

	try {
		await linkModel.destroy({
			where: {
				id: id,
			},
		});
	} catch {
		return {
			success: false,
			message: "Can't delete link.",
		};
	}

	return {
		success: true,
		message: 'Successfully deleted link.',
	};
}

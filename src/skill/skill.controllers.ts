// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { connectToDB } from 'src/utils/database';
import Skill from 'src/models/skill';
// ---------------------------------------------------------------------------------------------------------------------

export async function getDbSkills() {
	try {
		await connectToDB();

		return {
			success: true,
			skills: await Skill.find({}),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to get skills.',
		};
	}
}

export async function createDbSkill(name: string) {
	try {
		await connectToDB();

		await Skill.create({
			name,
		});

		return {
			success: true,
			skill: await Skill.findOne({ name }),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to create skill.',
		};
	}
}

export async function updateDbSkill(oldName: string, name: string) {
	try {
		await connectToDB();

		await Skill.updateOne(
			{
				name: oldName,
			},
			{
				name: name,
			},
		);

		return {
			success: true,
			skill: await Skill.findOne({
				name,
			}),
		};
	} catch {
		return {
			success: false,
			message: 'Failed to update skill.',
		};
	}
}

export async function deleteDbSkill(name: string) {
	try {
		await connectToDB();

		await Skill.deleteOne({
			name,
		});

		return {
			success: true,
		};
	} catch {
		return {
			success: false,
			message: 'Failed to delete skill.',
		};
	}
}

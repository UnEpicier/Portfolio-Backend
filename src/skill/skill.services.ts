// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { connectToDB } from 'src/utils/database';
import Skill from 'src/models/skill';
// ---------------------------------------------------------------------------------------------------------------------

const getSkillsInDB = async () => {
	try {
		await connectToDB();

		return {
			success: true,
			skills: await Skill.find({}),
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to get skills.',
		};
	}
};

const createSkillInDB = async (name: string) => {
	try {
		await connectToDB();

		await Skill.create({
			name,
		});

		return {
			success: true,
			skill: await Skill.findOne({ name }),
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to create skill.',
		};
	}
};

const updateSkillInDB = async (id: string, name: string) => {
	try {
		await connectToDB();

		await Skill.updateOne(
			{
				_id: id,
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
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to update skill.',
		};
	}
};

const deleteSkillInDB = async (id: string) => {
	try {
		await connectToDB();

		await Skill.deleteOne({
			_id: id,
		});

		return {
			success: true,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to delete skill.',
		};
	}
};

export { getSkillsInDB, createSkillInDB, updateSkillInDB, deleteSkillInDB };

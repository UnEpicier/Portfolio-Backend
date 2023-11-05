// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- DotEnv --------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------- Sequelize & Models --------------------------------------------------
import { Sequelize } from 'sequelize';
import { defineModelProject } from 'src/models/project';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Octokit -------------------------------------------------------
import { Octokit } from 'octokit';
// ---------------------------------------------------------------------------------------------------------------------

export async function dbGetProjects() {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const projectModel = defineModelProject(dbConn);

	const dbProjects = await projectModel.findAll();

	if (!dbProjects) {
		return {
			success: false,
			message: "Can't get projects.",
		};
	}

	return {
		success: true,
		message: 'Successfully getted projects.',
		projects: dbProjects,
	};
}

export async function dbRefreshProjects() {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const projectModel = defineModelProject(dbConn);

	// Remove all stored repos
	try {
		await projectModel.destroy({
			truncate: true,
		});
	} catch {
		return {
			success: false,
			message: "Can't delete all old projects stored in database.",
		};
	}

	const octokit = new Octokit({
		auth: process.env.GITHUB_TOKEN,
	});

	try {
		const { data } = await octokit.request('GET /user/repos', {
			per_page: 100,
			visibility: 'public',
		});

		data.map(async (repo) => {
			await projectModel.create({
				id: repo.id,
				ownerName: repo.owner.login,
				ownerImage: repo.owner.avatar_url,
				ownerUrl: repo.owner.url,
				name: repo.name,
				description: repo.description || '',
				stars: repo.stargazers_count,
				forks: repo.forks_count,
				topics: repo.topics ? repo.topics.toString() : '[]',
				license: repo.license?.name,
				link: repo.html_url,
				createdAt: repo.created_at || new Date().toISOString(),
				updatedAt: repo.updated_at || new Date().toISOString(),
			});
		});
	} catch {
		return {
			success: false,
			message: "Can't get and store projects from github.",
		};
	}

	return {
		success: true,
		message: 'Successfully refreshed projects.',
	};
}

export async function dbDeleteProject(id: number) {
	const dbConn = new Sequelize({
		dialect: 'sqlite',
		storage: `${process.cwd()}/databases/general.db`,
		logging: false,
	});
	const projectModel = defineModelProject(dbConn);

	try {
		await projectModel.destroy({
			where: {
				id: id,
			},
		});
	} catch {
		return {
			success: false,
			message: "Can't delete project.",
		};
	}

	return {
		success: true,
		message: 'Successfully deleted project.',
	};
}

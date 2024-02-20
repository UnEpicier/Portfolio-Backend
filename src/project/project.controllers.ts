// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- DotEnv --------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Mongoose -------------------------------------------------------
import { connectToDB } from 'src/utils/database';
import Project from 'src/models/project';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Octokit -------------------------------------------------------
import { Octokit } from 'octokit';
// ---------------------------------------------------------------------------------------------------------------------

export async function dbGetProjects() {
	try {
		await connectToDB();

		const projects = await Project.find({}).sort({ updatedAt: -1 });

		return {
			success: true,
			projects,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to get projects.',
		};
	}
}

export async function dbRefreshProjects() {
	try {
		await connectToDB();

		await Project.deleteMany({});

		const octokit = new Octokit({
			auth: process.env.GITHUB_TOKEN,
		});

		const { data } = await octokit.request('GET /user/repos', {
			per_page: 100,
			visibility: 'public',
		});

		data.map(async (repo) => {
			await Project.create({
				ownerName: repo.owner.login,
				ownerImage: repo.owner.avatar_url,
				ownerUrl: repo.owner.url,
				name: repo.name,
				description: repo.description ?? '',
				stars: repo.stargazers_count,
				forks: repo.forks_count,
				topics: repo.topics ?? [],
				license: repo.license?.name,
				url: repo.html_url,
				createdAt: repo.created_at ?? new Date().toISOString(),
				updatedAt: repo.updated_at ?? new Date().toISOString(),
			});
		});

		return {
			success: true,
			projects: data
				.map((repo) => {
					return {
						ownerName: repo.owner.login,
						ownerImage: repo.owner.avatar_url,
						ownerUrl: repo.owner.url,
						name: repo.name,
						description: repo.description ?? '',
						stars: repo.stargazers_count,
						forks: repo.forks_count,
						topics: repo.topics ?? [],
						license: repo.license?.name,
						url: repo.html_url,
						createdAt: repo.created_at ?? new Date().toISOString(),
						updatedAt: repo.updated_at ?? new Date().toISOString(),
					};
				})
				.sort(
					(a, b) =>
						new Date(b.updatedAt).getTime() -
						new Date(a.updatedAt).getTime(),
				),
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to refresh projects list.',
		};
	}
}

export async function dbDeleteProject(id: number) {
	try {
		await connectToDB();

		await Project.deleteOne({
			_id: id,
		});

		return {
			success: true,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to delete project.',
		};
	}
}

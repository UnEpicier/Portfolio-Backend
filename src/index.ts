// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Express -------------------------------------------------------
import express from 'express';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Middleware ------------------------------------------------------
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- DotEnv --------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------- Package Informations -------------------------------------------------
import pck from '../package.json';
console.log(`App name: ${pck.name}`);
console.log(`App version: ${pck.version}`);
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Routers -------------------------------------------------------
import auth from './auth/auth.routes';
import skill from './skill/skill.routes';
import link from './link/link.routes';
import message from './message/message.routes';
import project from './project/project.routes';
import about from './about/about.routes';
import experience from './experience/experience.routes';
import formation from './formation/formation.routes';
import blog from './blog/blog.routes';
// ---------------------------------------------------------------------------------------------------------------------

const app = express();
app.use(
	cors({
		origin: ['https://alexisvasseur.fr', 'http://localhost:3000'],
		optionsSuccessStatus: 200,
	}),
);
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		extended: true,
		parameterLimit: 50000,
	}),
);
app.use(
	bodyParser.json({
		limit: '50mb',
	}),
);

app.use(
	bodyParser.text({
		limit: '50mb',
	}),
);

app.use('/', auth);
app.use('/', skill);
app.use('/', link);
app.use('/', message);
app.use('/', project);
app.use('/', about);
app.use('/', experience);
app.use('/', formation);
app.use('/', blog);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});

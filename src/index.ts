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
// ---------------------------------------------------------------------------------------------------------------------

const app = express();
app.use(cors());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(bodyParser.json());

app.use('/', auth);
app.use('/', skill);
app.use('/', link);
app.use('/', message);
app.use('/', project);
app.use('/', about);
app.use('/', experience);

app.listen(process.env.PORT ?? 3000, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});

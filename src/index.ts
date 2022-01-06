import express from 'express';
import cors from 'cors';
import usersController from "./controller/usersController";
import themesController from "./controller/themesController";
import {sequelize} from './model/sequelize'
import contentsController from "./controller/contentsController";
import sourcesController from "./controller/sourcesController";

const bodyParser = require('body-parser')

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});

app.use(cors())
app.use(bodyParser.json())

usersController(app)
themesController(app)
contentsController(app)
sourcesController(app)

sequelize.afterSync(() => {
    console.log('Database has been successfully synced')
})





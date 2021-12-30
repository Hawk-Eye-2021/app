import express from 'express';
import usersController from "./controller/usersController";
import themesController from "./controller/themesController";
const bodyParser = require('body-parser')
import {sequelize} from './model/sequelize'

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});

app.use(bodyParser.json())

usersController(app)
themesController(app)

sequelize.afterSync(() => {
    console.log('Database has been successfully synced')
})





import express from 'express';
import usersController from "./src/controller/usersController";
import {syncSchema} from "./src/model/sequelize"
const bodyParser = require('body-parser')

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});

app.use(bodyParser.json())
usersController(app)

syncSchema()







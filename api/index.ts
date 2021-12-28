import express from 'express';
import usersController from "./src/controller/usersController";
import {syncSchema} from "./src/model/sequelize"

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});

usersController(app)


syncSchema()







import express from 'express';
import usersController from "./src/controller/usersController";
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});

usersController(app)


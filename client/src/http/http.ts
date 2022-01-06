import axios from "axios";

const http = axios.create({
    baseURL: "https://hawk-eye-api.herokuapp.com",
});

export default http
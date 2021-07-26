import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_API_HOST ?? "http://localhost:5000",
    timeout: 3000,
});

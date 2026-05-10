import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Authorization': 'Bearer exemplo'
    }
})

export default http
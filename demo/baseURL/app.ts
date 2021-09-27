import axios from "../../src/axios";

const instance = axios.create({
    baseURL: 'http://locahost:3005'
})

instance.get('/api/baseURL')

instance.get('http://locahost:3005/api/baseURL')
import axios from "../../src/axios";

axios({
    method: 'get',
    url: '/api/base',
    params: {
        a: 1,
        b: 2
    }
})

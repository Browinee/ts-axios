import axios from '../../src/index'

axios({
    method: 'post',
    url: '/api/handleRequestBody',
    data: {
        a: 1,
        b: 2
    }
})
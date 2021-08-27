import axios from '../../src/index'

axios({
    method: 'get',
    url: '/api/base',
    params: {
        a: 1,
        b: 2
    }
})

import axios from "../../src/axios";


axios({
    url: '/api/expandInterface',
    method: 'post',
    data: {
        msg: 'hi'
    }
})
axios.request({
    url: '/api/expandInterface',
    method: 'post',
    data: {
        msg: 'hello'
    }
})
axios.get('/api/expandInterface')

axios.options('/api/expandInterface')

axios.delete('/api/expandInterface')

axios.head('/api/expandInterface')

axios.post('/api/expandInterface', { msg: 'post' })

axios.put('/api/expandInterface', { msg: 'put' })

axios.patch('/api/expandInterface', { msg: 'patch' })
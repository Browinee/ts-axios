import axios from '../../src/axios';

// normal param
axios({
    method: 'get',
    url: '/api/handleRequestURL',
    params: {
        a: 1,
        b: 2
    }
})

// param value is array
axios({
    method: 'get',
    url: '/api/handleRequestURL',
    params: {
        foo: ['bar', 'baz']
    }
})

// param value is object
axios({
    method: 'get',
    url: '/api/handleRequestURL',
    params: {
        foo: {
            bar: 'baz'
        }
    }
})

// param value is Date
const date = new Date()
axios({
    method: 'get',
    url: '/api/handleRequestURL',
    params: {
        date
    }
})

// param value contains special character
axios({
    method: 'get',
    url: '/api/handleRequestURL',
    params: {
        foo: '@:$, '
    }
})

// param value contains null or `undefined`
axios({
    method: 'get',
    url: '/api/handleRequestURL',
    params: {
        foo: 'bar',
        baz: null
    }
})

// url contain hash
axios({
    method: 'get',
    url: '/api/handleRequestURL#?bar=baz',
    params: {
        foo: 'bar'
    }
})



// url already contains param value
axios({
    method: 'get',
    url: '/api/handleRequestURL?foo=bar',
    params: {
        bar: 'baz'
    }
})

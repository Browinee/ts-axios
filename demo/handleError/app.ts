import axios from '../../src/axios';

// 1.正常情况
axios({
    method: "get",
    url: "/api/handleError"
})
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    });

// // 2.wrong url
axios({
    method: "get",
    url: "/api/handleError1"
})
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log("handleError1: message", e.message);
        console.log("handleError1: config", e.config);
        console.log("handleError1: config", e.request);
        console.log("handleError1: config", e.code);
    });


// // 3. mock network error
setTimeout(() => {
    axios({
        method: "get",
        url: "/api/handleError"
    })
        .then(res => {
            console.log(res);
        })
        .catch(e => {
            console.log(e);
        });
}, 5000);
//
// // 4. mock timeout
axios({
    method: "get",
    url: "/api/handleError/timeout",
    timeout: 2000
})
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e.message);
    });
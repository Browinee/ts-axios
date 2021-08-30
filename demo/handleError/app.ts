import axios from "../../src/index";

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
        console.log(e);
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
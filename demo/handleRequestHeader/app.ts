import axios from "../../src/index";

// axios({
//     method: "post",
//     url: "/api/handleRequestHeader",
//     data: {
//         a: 1,
//         b: 2
//     }
// });

axios({
    method: "post",
    url: "/api/handleRequestHeader",
    headers: {
        "content-type": "application/json;charset=UTF-8",
        "Accept": "application/json,text/plain,*/*"
    },
    data: {
        a: 1,
        b: 2,
    }
});
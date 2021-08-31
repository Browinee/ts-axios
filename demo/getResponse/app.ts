import axios from '../../src/axios';

axios({
    method: "post",
    url: "/api/getResponse",
    data: {
        a: 1,
        b: 2
    }
}).then(res => {
    console.log("No response type", res);
});

axios({
    method: "post",
    url: "/api/getResponse",
    responseType: "json",
    data: {
        a: 3,
        b: 4
    }
}).then(res => {
    console.log("With response type: json", res);
});
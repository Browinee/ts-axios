import axios from "../../src/axios";

axios.get("/api/checkStatus").then(res => {
    console.log("checkStatus", res);
})
    .catch(e => console.log("Without validateStatus", e))

axios
    .get("/api/checkStatus", {
        validateStatus: status => status >= 200 && status < 400
    })
    .then(res => {
        console.log("checkStatus", res);
    });
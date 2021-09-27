import axios from "../../src/axios";


axios.post("http://localhost:3005/api/addWithCredentials", {}).then(res => {
    console.log("Without", res);
});

axios.post("http://localhost:3005/api/addWithCredentials", {}, {
    withCredentials: true
}).then(res => {
    console.log("With", res);
});

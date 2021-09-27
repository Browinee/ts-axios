import axios from "../../src/axios";

const config = {
    baseURL: "https://www.test.com/",
    url: "/user/test",
    params: {
        idClient: 1,
        idTest: 2,
        testString: "thisIsATest"
    }
};
console.log(axios.getUri(config));
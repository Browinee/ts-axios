const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const router = express.Router();


router.get("/api/base", function(req, res) {
  res.json({
    msg: `hello world`
  });
});

router.get("/api/handleRequestURL", function(req, res) {
  res.json(req.query);
});

router.post("/api/handleRequestBody", function(req, res) {
  res.json(req.body);
});

router.post("/api/handleRequestHeader", function(req, res) {
  res.json(req.body);
});

router.post("/api/getResponse", function(req, res) {
  res.json(req.body);
});
router.get("/api/handleError", function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    });
  } else {
    res.status(500);
    res.end();
  }
});

router.get("/api/handleError/timeout", function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    });
  }, 3000);
});
router.get("/api/expandInterface", function(req, res) {
  res.json({
    msg: "hello world"
  });
});

router.options("/api/expandInterface", function(req, res) {
  res.end();
});

router.delete("/api/expandInterface", function(req, res) {
  res.end();
});

router.head("/api/expandInterface", function(req, res) {
  res.end();
});

router.post("/api/expandInterface", function(req, res) {
  res.json(req.body);
});

router.put("/api/expandInterface", function(req, res) {
  res.json(req.body);
});

router.patch("/api/expandInterface", function(req, res) {
  res.json(req.body);
});

router.post("/api/addParameters", function(req, res) {
  res.json(req.body);
});

router.get("/api/getuser", function(req, res) {
  res.json({
    msg: "hello world",
    data: { name: "难凉热血", age: 18 }
  });
});

router.post("/api/mergeConfig", function(req, res) {
  res.json(req.body);
});

router.post("/api/transformData", function(req, res) {
  res.json(req.body);
});

router.post("/api/expandCreateInterface", function(req, res) {
  res.json(req.body);
});

router.get("/api/cancel", function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    });
  }, 3000);
});

// 添加withCredentials
const cors = {
  "Access-Control-Allow-Origin": "http://192.168.1.106:8000",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

router.post("/api/addWithCredentials", function(req, res) {
  res.set(cors);
  res.json(req.cookies);
});

router.options("/api/addWithCredentials", function(req, res) {
  res.set(cors);
  res.end();
});

//
router.get("/api/defendXSRF", function(req, res) {
  res.cookie("XSRF-NLRX", "NLRX");
  res.json(req.cookies);
});
// 文
router.get("/api/downloadFile", function(req, res) {
  res.sendFile(__dirname + "/1.mp4");
});

// HTTP
const atob = require("atob");
router.get("/api/HTTPAuthorization", function(req, res) {
  const auth = req.headers.authorization;
  const [type, credentials] = auth.split(" ");
  const [username, password] = atob(credentials).split(":");
  res.json({
    type: type,
    username: username,
    password: password
  });
});
router.get("/api/addParamsSerializer", function(req, res) {
  res.end();
});
router.get("/api/baseURL", function(req, res) {
  res.set(cors);
  res.end();
});
router.get("/api/allAndSpreadA", function(req, res) {
  res.json({
    data: "allAndSpreadA"
  });
});
router.get("/api/allAndSpreadB", function(req, res) {
  res.json({
    data: "allAndSpreadB"
  });
});
app.use(router);

const port = process.env.PORT || 3005;
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
});



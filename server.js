const config = require("config");
const xhub = require("express-x-hub");
const PORT = process.env.PORT || 3099;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const api = require("./routes/api");
app.use(express.json());
app.use("/api", api);
app.use(xhub({ algorithm: "sha1", secret: process.env.APP_SECRET }));
app.use(bodyParser.json());

let token = process.env.TOKEN || "token";
let received_updates = [];

app.get("/", function (req, res) {
  console.log(req);
  res.send("<pre>" + JSON.stringify(received_updates, null, 2) + "</pre>");
});

app.get(["/facebook", "/instagram"], function (req, res) {
  if (
    req.query["hub.mode"] == "subscribe" &&
    req.query["hub.verify_token"] == token
  ) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.sendStatus(400);
  }
});

app.post("/webhook", (req, res) => {
  res.send({ message: "Ok!" });
});

app.post("/facebook", function (req, res) {
  console.log("Facebook request body:", req.body);
  console.log("req: ", req);

  // if (!req.isXHubValid()) {
  //   console.log(
  //     "Warning - request header X-Hub-Signature not present or invalid"
  //   );
  //   res.sendStatus(401);
  //   return;
  // }

  // Process the Facebook updates here
  received_updates.unshift(req.body);
  // res.sendStatus(200);
  res.send("ok");
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

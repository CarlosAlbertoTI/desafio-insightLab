const express = require("express");
const ParseDashboard = require("parse-dashboard");
const { default: ParseServer } = require("parse-server");

const app = express();

const parseServer = new ParseServer({
  databaseURI:
    "mongodb+srv://carlos:carlos123@cluster0.bpzcb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  appId: "flight",
  masterKey: "12345678",
  serverURL: "http://localhost:1337/parse",
  publicServerURL: "http://localhost:1337/parse",
});

const dashboard = new ParseDashboard({
  apps: [
    {
      appId: "flight",
      masterKey: "12345678",
      serverURL: "http://localhost:1337/parse",
      appName: "flight",
    },
  ],
});

app.use("/parse", parseServer.app);
app.use("/dashboard", dashboard);

app.listen(1337, () => {
  console.log("Rest api parse rodando em http://localhost:1337/parse");
});

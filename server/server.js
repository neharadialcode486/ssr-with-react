import express from "express";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";
import path from "path";

const app = express();
const router = express.Router();
const PORT = 8000;
router.use("/", (request, response) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (error, data) => {
    if (error) {
      console.log(error, "error");
      return response.status(500).send("error", error);
    }
    return response.send(
      data.replace(
        '<div id="root"></div>',
        `<div id='root'>${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
});
router.use(
  express.static(path.resolve(__dirname, "..", "build"), {
    maxAge: "30d",
  })
);
app.use(router);
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

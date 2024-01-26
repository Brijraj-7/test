const { match } = require("assert");
const express = require("express");
const app = express();
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const apiUrl = "https://api.quotable.io/quotes?tags=happiness";
const color = ["red", "blue", "aqua", "green", "brown"];

const font = ["Dancing Script", "Open", "Rubik Burned", "Teko", "Single Day"];

app.get("/", async (req, res) => {
  const url = await fetch(apiUrl);
  const data = await url.json();
  const cont = data.results[5].content;
  res.render("home.ejs", { cont, font, color });
});
app.post("/generate", async (req, res) => {
  const url = await fetch(apiUrl);
  const data = await url.json();
  const cont = data.results[5].content;
  const newfont = req.body.font;
  const newcolor = req.body.color;
  res.render("home.ejs", { newfont, newcolor, cont, font, color });
});
app.listen(8080, () => {
  console.log("server is listening on port 8080");
});

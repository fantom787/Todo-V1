const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var items = ["Buy Food", "Cook Food", "Eat Food"];
var workItems = [];
var date = new Date();
var options = {
  weekday: "long",
  day: "numeric",
  month: "long",
};
var day = date.toLocaleDateString("en-US", options);

app.get("/", function (req, res) {
  res.render("list", { typeOfDay: day, newListItem: items, val: "Home" });
});

app.get("/work", function (req, res) {
  res.render("list", {
    typeOfDay: "Work List",
    newListItem: workItems,
    val: "work",
  });
});

app.get("/About", function (req, res) {
    res.render("about");
});

app.post("/", function (req, res) {
  const newItem = req.body.newItem;
  if (req.body.list == "work") {
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    items.push(newItem);
    res.redirect("/");
  }
});

app.listen(3000, function () {
  console.log("server is at port 3000");
});

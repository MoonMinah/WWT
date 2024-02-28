const express = require("express");
const app = express();
const PORT = 8000;
const db = require("./models");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/static"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const router = require("./routes");


const indexRouter = require("./routes");
app.use("/", indexRouter);

//db연동
db.sequelize.sync({ force: false }).then((result) => {
    // console.log(result);
    console.log("DB연결 성공");
  });
  

app.get("*", (req, res) => {
    res.render("404");
});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

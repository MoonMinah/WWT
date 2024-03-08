const express = require("express");
const app = express();
const PORT = 8000;
const db = require("./models");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const uploadProfile = multer({
    dest: "uploads/profile",
});

const uploadDetail = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/profile"); // 저장될 파일 경로 설정
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname); // 확장자를 담는 코드

            cb(null, path.basename(file.originalname, ext) + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

// multer 디테일 설정
// limits : 파일 제한 설정
// diskStorage : 파일을 디스크에 저장하기 위한 모든 제어 기능을 제공
// destination : 저장할 경로
// filename : 파일명

const AdminMemberSearch = require("./AdminMemberSearch");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/static", express.static(__dirname + "/static"));
app.use("/img", express.static(__dirname + "/img"));
app.use(
    session({
        secret: "secretKey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
        },
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const router = require("./routes");
const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");

app.use("/", indexRouter);
app.use("/admin", adminRouter);

db.sequelize.sync({ force: false }).then((result) => {
    // console.log(result);
    console.log("DB연결 성공");
});

app.get("*", (req, res) => {
    res.render("404");
});

app.post("/getPlaces", async (req, res) => {
    const { keyword } = req.body;

    try {
        // Google Places API를 사용하여 건물 이름과 관련된 장소 검색
        const placesResponse = await axios.get(
            "https://maps.googleapis.com/maps/api/place/textsearch/json",
            {
                params: {
                    query: keyword,
                    key: apiKey,
                },
            }
        );

        const places = placesResponse.data.results.map((place) => ({
            name: place.name,
            place_id: place.place_id,
        }));

        res.json({ places });
    } catch (error) {
        console.error("Error fetching places:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    console.log(`http://49.50.167.42:${PORT}`);
});

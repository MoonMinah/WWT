//const User = require("../models/User");
const model = require("../models");

exports.open = (req, res) => {
    res.render("open");
};
exports.main = (req, res) => {
    res.render("main");
};
exports.login = (req, res) => {
    res.render("login");
};
exports.join = (req, res) => {
    res.render("join");
};
exports.myPage = (req, res) => {
    res.render("myPage");
};
exports.post = (req, res) => {
    res.render("post");
};
exports.postEdit = (req, res) => {
    res.render("postEdit");
};
exports.profileEdit = (req, res) => {
    res.render("profileEdit");
};

//POST
exports.postJoin = (req, res) => {
    model.User.create({
        userID: req.body.userID,
        userPW: req.body.userPW,
        userName: req.body.userName,
        userNickname: req.body.userNickname,
        userEmail: req.body.userEmail,
    })
        .then((result) => {
            console.log(result);
            res.end("회원가입 성공");
        })
        .catch((err) => {
            console.log("회원가입 실패", err);
            res.status(500).send("회원가입 실패");
        });
};

exports.postLogin = (req, res) => {
    model.User.findOne({
        where: {
            userID: req.body.userID,
            userPW: req.body.userPW,
        },
    }).then((result) => {
        if (result) {
            req.session.userID = req.body.userID;
            res.send(true);
        } else {
            res.send(false);
        }
    });
};

exports.postLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send("서버에러");
            throw err;
        }
        res.clearCookie("sessionID"); // 세션 쿠키 삭제
        res.redirect("/");
    });
};

exports.postProfile = (req, res) => {
    model.User.findOne({
        where: {
            userID: req.session.userID,
        },
    })
        .then((result) => {
            if (!result) {
                return res.status(404).send("사용자 정보를 찾을 수 없습니다.");
            }
            //console.log("프로필페이지");
            res.render("profileEdit", { data: result });
        })
        .catch(() => {
            //console.log("프로필 조회 실패");
            res.send(500).send("프로필 조회 실패");
        });
};

exports.deleteUser = (req, res) => {
    const user = req.session.userID;
    if (user !== req.body.userID) {
        return res.status(403).send("권한이 없습니다.");
    }
    if (!req.session) {
        return res.status(500).send("세션을 찾을 수 없습니다.");
    }
    req.session.destroy((err) => {
        if (err) {
            console.error("세션 삭제 실패:", err);
            return res.status(500).send("세션 삭제 실패");
        }
        // 쿠키를 삭제합니다.
        res.clearCookie("sessionID");
        res.end();
    });
};

exports.editUser = (req, res) => {
    const user = req.session.userID;
    if (user !== req.body.userID) {
        return res.status(403).send("권한이 없습니다.");
    }
    model.User.update(
        {
            userID: req.body.userID,
            userPW: req.body.userPW,
            userName: req.body.userName,
            userNickname: req.body.userNickname,
            userEmail: req.body.userEmail,
            //userPhoto
            //userText
        },
        {
            where: { userID: req.body.userID },
        }
    )
        .then((result) => {
            console.log("정보변경");
            res.render("profileEdit", { data: result });
        })
        .catch(() => {
            // console.error("오류가 발생", err);
            res.status(500).send("프로필 정보를 가져올 수 없습니다.");
        });
};

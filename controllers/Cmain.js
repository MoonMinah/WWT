const model = require("../models");

exports.open = (req, res) => {
    if (req.session.userID) {
        console.log("open에서 로그인", req.session.data.userNickname);
        res.render("open", { isLogin: true, data: req.session.data });
    } else {
        res.render("open", { isLogin: false });
    }
};
exports.main = (req, res) => {
    if (req.session.userID) {
        console.log("main에서 로그인", req.session.data.userNickname);
        res.render("main", { isLogin: true, data: req.session.data });
    } else {
        res.render("main", { isLogin: false });
    }
};
exports.login = (req, res) => {
    res.render("login", { isLogin: false });
};
exports.join = (req, res) => {
    res.render("join", { isLogin: false });
};
exports.myPage = (req, res) => {
    if (req.session.userID) {
        console.log("myPage에서 로그인", req.session.data.userNickname);
        res.render("myPage", { isLogin: true, data: req.session.data });
    } else {
        res.render("myPage", { isLogin: false });
    }
};
exports.post = (req, res) => {
    if (req.session.userID) {
        console.log("post에서 로그인", req.session.data.userNickname);
        res.render("post", { isLogin: true, data: req.session.data });
    } else {
        res.render("post", { isLogin: false });
    }
};
exports.postEdit = (req, res) => {
    if (req.session.userID) {
        console.log("postEdit에서 로그인", req.session.data.userNickname);
        res.render("postEdit", {
            isLogin: true,
            data: req.session.data,
        });
    } else {
        res.render("postEdit", { isLogin: false });
    }
};
exports.profileEdit = (req, res) => {
    if (req.session.userID) {
        console.log("profileEdit에서 로그인", req.session.data.userNickname);
        res.render("profileEdit", { isLogin: true, data: req.session.data });
    } else {
        res.render("profileEdit", { isLogin: false });
    }
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
            req.session.data = result;
            // console.log("이것은 로그인입니다 !!", result);
            res.send({ isLogin: true, data: result });
            // res.render("open", { data: result });
        } else {
            res.send(false);
        }
    });
};

exports.postLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("세션 삭제 실패:", err);
            return res.status(500).send("서버에러");
        }
        res.clearCookie("sessionID");
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
            console.log("프로필페이지", result);
            res.render("profileEdit", { data: result });
        })
        .catch(() => {
            //console.log("프로필 조회 실패");
            res.send(500).send("프로필 조회 실패");
        });
};

exports.deleteUser = (req, res) => {
    const user = req.session.userID;
    const userIDFromClient = req.body.userID;

    if (user !== userIDFromClient) {
        return res.status(403).send("권한이 없습니다.");
    }

    model.User.destroy({
        where: { userID: user },
    })
        .then(() => {
            req.session.destroy((err) => {
                if (err) {
                    console.error("세션 삭제 실패:", err);
                    return res.status(500).send("서버에러");
                }
                res.clearCookie("sessionID");
                res.redirect("/");
            });
        })
        .catch((err) => {
            console.error("회원 탈퇴 실패:", err);
            res.status(500).send("회원 탈퇴 실패");
        });
};

exports.editUser = (req, res) => {
    const loggedInUserID = req.session.userID;
    const userIDFromClient = req.body.userID;

    if (loggedInUserID !== userIDFromClient) {
        return res.status(403).send("권한이 없습니다.");
    }

    model.User.update(
        {
            userPW: req.body.userPW,
            userName: req.body.userName,
            userNickname: req.body.userNickname,
            userEmail: req.body.userEmail,
        },
        {
            where: { userID: loggedInUserID },
        }
    )
        .then(() => {
            // 회원정보 수정 후 프로필 편집 페이지로 리다이렉션
            res.redirect("/profileEdit");
        })
        .catch((err) => {
            console.error("프로필 정보 업데이트 실패", err);
            res.status(500).send("프로필 정보 업데이트 실패");
        });
};

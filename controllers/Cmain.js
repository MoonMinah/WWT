const model = require("../models");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRound = 10;
function hashPW(pw) {
    return bcrypt.hashSync(pw, saltRound);
}
function comparePW(inputpw, hashedpw) {
    return bcrypt.compareSync(inputpw, hashedpw);
}

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
        model.Post.findAll({
            attributes: ["postTitle", "postNumber", "reImage"],
            order: [["createdAt", "DESC"]],
            limit: 20,
        }).then((result) => {
            res.render("main", { isLogin: true, data: req.session.data, posts: result }); //메인 페이지에 접근 할 때, 최신글 20개에 대해, postNumber, postTitle, reImage(대표 이미지 경로)
            //를 보내고 있습니다. 이 또한 console.log()찍으시면서 작업하시면 수월하실겁니다.
        });
    } else {
        model.Post.findAll({
            attributes: ["postTitle", "postNumber", "reImage"],
            order: [["createdAt", "DESC"]],
            limit: 20,
        }).then((result) => {
            console.log(result);
            res.render("main", { isLogin: false, posts: result }); // 이 또한, 위 주석과 설명이 같습니다.
        });
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
        model.Post.count({
            where: {
                userID: req.session.data.id,
            },
        })
            .then((result) => {
                const myPostCount = result;
                model.Post.findAll({
                    attributes: ["postNumber", "reImage"],
                    where: {
                        userId: req.session.data.id,
                    },
                }).then((findResult) => {
                    res.render("myPage", {
                        isLogin: true,
                        data: req.session.data,
                        myPagePostCount: myPostCount, //내가 몇개의 포스트를 작성하였는가
                        myPosts: findResult, //내가 작성한 포스트들에 대한 정보. (postID와, 대표이미지의 경로가 갈 것입니다.)
                        //프론트단에서 작업할 때, console.log()찍으면서 작업하시면 편할거에요.
                    });
                });
            })
            .catch((error) => {
                console.error(error);
            });
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
        userPW: hashPW(req.body.userPW),
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
        },
    }).then((result) => {
        if (result) {
            const LoginResult = comparePW(req.body.userPW, result.userPW);
            if (LoginResult) {
                req.session.userID = req.body.userID;
                req.session.data = result;
                // console.log("이것은 로그인입니다 !!", result);
                res.send({ isLogin: true, data: result });
                // res.render("open", { data: result });
            } else {
                res.send("비밀번호가 틀렸습니다");
            }
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
            userPW: hashPW(req.body.userPW),
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

exports.uploadProfile = (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.send("파일 업로드 완료!");
};

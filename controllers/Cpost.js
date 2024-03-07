const model = require("../models");
const path = require("path");
const id = 1;
exports.postPost = (req, res) => {
    console.log(req.session);

    if (req.session.userID) {
        console.log(req.body.postTitle);
        console.log(req.session.data);
        const title = req.body.postTitle;
        const weather = req.body.weather;
        const region = req.body.region;
        const postCourseList = req.body.postCourse;
        model.Post.create({
            userID: req.session.data.id,
            postTitle: title,
            weather: weather,
            region: region,
            reImage: postCourseList[0].courseImagePath, // 글 불러오기를 위해 대표 이미지로 가장 첫 코스의 이미지를 가져오도록
        })
            .then((result) => {
                console.log("temp", result.postNumber);
                for (let i = 0; i < postCourseList.length; i++) {
                    model.PostCourse.create({
                        postNumber: result.postNumber,
                        courseImagePath: postCourseList[i].courseImagePath,
                        courseLon: postCourseList[i].courseLon,
                        courseLat: postCourseList[i].courseLat,
                        courseText: postCourseList[i].courseText,
                    });
                }
                res.redirect(`/getPost/${result.postNumber}`);
            })
            .catch((error) => {
                console.error("데이터베이스 작업 중 오류:", error);
                res.status(500).send("내부 서버 오류");
            });
    } else {
        res.status(401).send("세션이 유효하지 않습니다");
        //세션이 유효하지 않는다는 페이지로 수정해야함!!
    }
};

exports.showPost = (req, res) => {
    const isLogin = req.session.userID ? true : false;
    const PostNumber = req.params.postID;

    model.Post.findOne({
        where: {
            postNumber: PostNumber,
        },
    }).then((postData) => {
        model.PostCourse.findAll({
            where: {
                postNumber: PostNumber,
            },
        })
            .then((postCourseData) => {
                model.PostCourse.findAll({
                    where: {
                        postNumber: PostNumber,
                    },
                }).then((commentResult) => {
                    console.log(">>>", postData, ">>>", commentResult);

                    if (isLogin) {
                        res.render("post", {
                            isLogin: isLogin,
                            postData: postData,
                            commentResult: commentResult,
                            postCourseData: postCourseData,
                            data: req.session.data,
                        });
                    } else {
                        res.render("post", {
                            isLogin: isLogin,
                            postData: postData,
                            commentResult: commentResult,
                            postCourseData: postCourseData,
                        });
                    }
                });
            })
            .catch((err) => console.log(err));
    });
};

exports.deletePost = (req, res) => {
    if (!req.session.data) {
        res.send("게시글을 삭제할 권한이 없습니다!");
    } else {
        const CURRENTUSER = req.session.data.id;
        const postNumber = req.params.postID;
        model.Post.findOne({
            where: {
                postNumber: postNumber,
            },
        })
            .then((result) => {
                if (result.userID === CURRENTUSER) {
                    model.Post.destroy({
                        where: {
                            postNumber: postNumber,
                        },
                    })
                        .then(() => {
                            res.send("삭제 완료!");
                            //res.redirect('/');
                        })
                        .catch((err) => {
                            console.log("데이터를 삭제하는 중 에러가 발생했습니다", err);
                        });
                }
            })
            .catch((err) => {
                console.log("params로 전달한 ID로 조회중, 오류가 발생했습니다!", err);
            });
    }
};

exports.putPostRequest = (req, res) => {
    const PostNumber = req.params.postID;

    if (!req.session.data) {
        res.send("수정할 권한이 없습니다! 로그인 해주세요");
    } else {
        const CURRENTUSER = req.session.data.id;
        model.Post.findOne({
            where: {
                postNumber: PostNumber,
            },
        }).then((postResult) => {
            if (CURRENTUSER === postResult.userID) {
                model.PostCourse.findAll({
                    where: {
                        postNumber: PostNumber,
                    },
                })
                    .then((courseResult) => {
                        // res.render("postEdit", {
                        //     postResult: postResult,
                        //     courseResult: courseResult,
                        //     isLogin: true,
                        // });
                        res.send({
                            postResult: postResult,
                            courseResult: courseResult,
                        });
                    })
                    .catch((err) => {
                        console.log("course를 조회하다 오류가 발생", err);
                    });
            } else {
                res.send("권한 없음");
            }
        });
    }
};

exports.putPost = (req, res) => {
    const PostNumber = req.params.postID;
    if (!req.session.data) {
        res.send("세션이 만료되었습니다. 다시 로그인 해주세요");
    } else {
        const title = req.body.postTitle;
        const weather = req.body.weather;
        const region = req.body.region;
        const postCourseList = req.body.postCourse;
        model.Post.update(
            {
                postTitle: title,
                weather: weather,
                region: region,
                reImage: postCourseList[0].courseImagePath,
            },
            {
                where: {
                    postNumber: PostNumber,
                },
            }
        ).then(() => {
            model.PostCourse.destroy({
                where: {
                    postNumber: PostNumber,
                },
            }).then(() => {
                for (let i = 0; i < postCourseList.length; i++) {
                    model.PostCourse.create({
                        postNumber: PostNumber,
                        courseImagePath: postCourseList[i].courseImagePath,
                        courseLon: postCourseList[i].courseLon,
                        courseLat: postCourseList[i].courseLat,
                        courseText: postCourseList[i].courseText,
                    });
                }
                res.redirect(`/getPost/${PostNumber}`);
            });
        });
    }
};

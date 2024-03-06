const model = require("../models");
const path = require("path");
const id = 1;
exports.postPost = (req, res) => {
    console.log(req.session);

    if (req.session.userID) {
        console.log(req.body.postTitle);
        const title = req.body.postTitle;

        console.log(req.session.data);
        const postCourseList = req.body.postCourse;
        model.Post.create({
            userID: req.session.data.id,
            postTitle: title,
            reImage: postCourseList[0].courseImagePath, // 글 불러오기를 위해 대표 이미지로 가장 첫 코스의 이미지를 가져오도록
        }).then((result) => {
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
            res.send("작업중");
        });
    } else {
        res.send("유효하지 않는 세션");
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
                    res.send({
                        isLogin: isLogin,
                        postData: postData,
                        commentResult: commentResult,
                        postCourseData: postCourseData,
                    });
                });
            })
            .catch((err) => console.log(err));
    });
};

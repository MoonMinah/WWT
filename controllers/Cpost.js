const model = require("../models");
const path = require("path");
const id = 1;
exports.postPost = (req, res) => {
    req.session.userID = "11"; // 테스트를 위해 임시로 작성 삭제해야함
    if (req.session.userID) {
        console.log(req.body.postTitle);
        const title = req.body.postTitle;

        console.log(req.session.data);
        const postCourseList = req.body.postCourse;
        model.Post.create({
            userID: req.session.data.id,
            postTitle: title,
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

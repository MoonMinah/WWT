const model = require("../models");
const path = require("path");
const uID = 1;
const pN = 3;

exports.postComment = (req, res) => {
    if (req.session.userID) {
        console.log(req.body);
        model.PostComment.create({
            postNumber: req.body.postNumber,
            userID: req.body.userID,
            commentText: req.body.commentText,
        }).then((result) => {
            console.log(result);
            res.send("OK");
        });
    } else {
        res.send("유효하지 않는 세션");
        //세션이 유효하지 않는다는 페이지로 수정해야함!!
    }
};

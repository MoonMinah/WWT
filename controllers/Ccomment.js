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
            isReply: req.body.isReply, //isReply는 postCommet 모델에서, 대댓글을 의미하는 것으로 ,
            //몇번쨰 댓글(commetID)에 대한 답글인지를 가지고 있는 데이터 입니다. isReply는 commentID(commet 모델의 PK)를 외래키로 가지는 값입니다.
        }).then((result) => {
            console.log(result);
            res.send("OK");
        });
    } else {
        res.send("유효하지 않는 세션");
        //세션이 유효하지 않는다는 페이지로 수정해야함!!
    }
};

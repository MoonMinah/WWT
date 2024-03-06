const express = require("express");
const router = express.Router();
const controller = require("../controllers/Cmain");

router.get("/", controller.open);
router.get("/login", controller.login);
router.get("/main", controller.main);
router.get("/join", controller.join);
router.get("/myPage", controller.myPage);
router.get("/post", controller.post);
router.get("/postEdit", controller.postEdit);
router.get("/profileEdit", controller.profileEdit);

router.post("/join", controller.postJoin);
router.post("/login", controller.postLogin);
router.get("/logout", controller.postLogout);
router.post("/profileEdit", controller.postProfile);
router.post("/deleteUser", controller.deleteUser);
router.post("/editUser", controller.editUser);

//포스트와 관련된 router설정
const postController = require("../controllers/Cpost");
router.post("/temp", postController.postPost); // 게시글 등록에 관한 api입니다. req의 body데이터로,
//{
//    "postTitle" :"임시제목",
//    "postCourse" : [{"courseImagePath" : "temp", "courseLon":12.12, "courseLat":13.13, "courseText":"course설명입니다"},{"courseImagePath" : "temp", "courseLon":12.12, "courseLat":13.13, "courseText":"course설명입니다"}]
//  }와 같은 형태로 받도록 되어 있습니다.

//포스트의 댓글과 관련된 router 설정
const commentController = require("../controllers/Ccomment.js");
router.post("/temp2", commentController.postComment); // 댓글 등록에 관한 api입니다. req의 body 데이터로,
//{
//     "postNumber": 1,
//     "userID": 1,
//     "commentText": "댓글 내용입니다"
//   }와 같은 형태로 받고 있습니다.

module.exports = router;

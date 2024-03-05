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
// router.get("/postCount", controller.getPostCount);

router.post("/join", controller.postJoin);
router.post("/login", controller.postLogin);
router.get("/logout", controller.postLogout);
router.post("/profileEdit", controller.postProfile);
router.post("/deleteUser", controller.deleteUser);
router.post("/editUser", controller.editUser);

//포스트와 관련된 router설정
const postController = require("../controllers/Cpost");
router.post("/temp", postController.postPost);

//포스트의 댓글과 관련된 router 설정
const commentController = require("../controllers/Ccomment.js");
router.post("/temp2", commentController.postComment);
module.exports = router;

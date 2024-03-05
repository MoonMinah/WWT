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

module.exports = router;

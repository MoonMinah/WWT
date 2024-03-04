const express = require("express");
const router = express.Router();
const controller = require("../controllers/Cadmin");
const AdminMemberSearch = require("../AdminMemberSearch"); // AdminMemberSearch 모듈 import

// 엘라스틱서치 검색 서비스 객체 생성
const adminMemberSearch = new AdminMemberSearch();

//admin
router.get("/", controller.admin);
router.get("/adminAccess", controller.adminAccess);
router.get("/adminQNA", controller.adminQNA);
router.get("/members", controller.members);
router.get("/memberSearch", controller.memberSearch(adminMemberSearch)); // adminMemberSearch 객체를 함수에 전달
router.post("/memberUpdate", controller.updateMember);
router.post("/deleteMember", controller.deleteMember);

module.exports = router;

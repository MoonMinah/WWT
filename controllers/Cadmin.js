const model = require("../models");

exports.admin = (req, res) => {
    res.render("admin");
};

exports.adminAccess = async (req, res) => {
    try {
        const users = await model.User.findAll();
        res.render("adminAccess", { members: users });
    } catch (error) {
        console.error("회원 목록 조회 오류:", error);
        res.status(500).send("회원 목록 조회 오류 발생");
    }
};

exports.adminQNA = (req, res) => {
    res.render("adminQNA");
};

exports.members = async (req, res) => {
    try {
        const users = await model.User.findAll();
        res.render("adminMember", { members: users });
    } catch (error) {
        console.error("회원 목록 조회 오류:", error);
        res.status(500).send("회원 목록 조회 오류 발생");
    }
};

exports.memberSearch = (adminMemberSearch) => async (req, res) => {
    const query = req.query.query;
    try {
        const members = await adminMemberSearch.execute(query);
        res.render("adminMemberSearchResult", { members });
    } catch (error) {
        console.error("회원 검색 오류:", error);
        res.status(500).send("회원 검색 오류 발생");
    }
};

exports.updateMember = async (req, res) => {
    const memberVO = req.body;
    try {
        const updatedMember = await model.updateMember(memberVO);
        res.json(updatedMember);
    } catch (error) {
        console.error("회원 정보 수정 오류:", error);
        res.status(500).send("회원 정보 수정 오류 발생");
    }
};

exports.deleteMember = async (req, res) => {
    const memberIds = req.body.memberIds; // 클라이언트로부터 전달된 멤버 ID 배열

    try {
        // 멤버 삭제 로직 구현
        await model.User.destroy({
            where: {
                id: memberIds, // 선택된 회원의 ID 배열을 사용하여 멤버를 삭제합니다.
            },
        });

        res.json({ message: "선택된 회원이 삭제되었습니다." });
    } catch (error) {
        console.error("회원 삭제 오류:", error);
        res.status(500).send("회원 삭제 오류 발생");
    }
};

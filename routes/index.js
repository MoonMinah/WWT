const express = require("express");
const router = express.Router();
const controller = require("../controllers/Cmain");

router.get("/", controller.open);

module.exports = router;

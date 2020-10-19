const express = require("express");

const { serveyGetMethod, serveyPostMethod } = require("../controllers/servey");

const router = express.Router();

router.route("/").get(serveyGetMethod).post(serveyPostMethod);

module.exports = router;

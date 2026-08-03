const express = require("express");
const router = express.Router();

const {
  createDelegate,
} = require("../controllers/delegateController");

router.post("/", createDelegate);

module.exports = router;
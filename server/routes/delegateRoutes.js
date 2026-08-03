const express = require("express");
const router = express.Router();

const {
  createDelegate,
  getDelegates,
} = require("../controllers/delegateController");

// Get All Delegates
router.get("/", getDelegates);

// Create Delegate
router.post("/", createDelegate);

module.exports = router;
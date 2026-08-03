const express = require("express");
const router = express.Router();

const {
  createDelegate,
  getDelegates,
  getDelegateById,
} = require("../controllers/delegateController");

// Get All Delegates
router.get("/", getDelegates);
router.get("/:id", getDelegateById);
// Create Delegate
router.post("/", createDelegate);

module.exports = router;
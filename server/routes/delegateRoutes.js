const express = require("express");
const router = express.Router();

const {
  createDelegate,
  getDelegates,
  getDelegateById,
  updateDelegate,
} = require("../controllers/delegateController");

// Get All Delegates
router.get("/", getDelegates);
router.get("/:id", getDelegateById);
// Create Delegate
router.post("/", createDelegate);
// Update Delegate
router.put("/:id", updateDelegate);

module.exports = router;
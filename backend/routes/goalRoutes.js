const express = require("express");
const router = express.Router();
const {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
} = require("../controllers/goalControllers");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getGoals);
router.post("/", protect, setGoal);
router.put("/:id", protect, updateGoal);
router.delete("/:id", protect, deleteGoal);

// alternative
// router.route('/).get(getGoals).post(setGoal)
// router.route('/:id).delete(deleteGoal).put(updateGoal)

module.exports = router;

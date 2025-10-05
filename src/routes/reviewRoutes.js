const app = require('express');

const router = app.Router();
const reviewController = require('../controllers/reviewController')

router.get("/", reviewController.getAll);
router.get("/:id", reviewController.getById);

module.exports = router;
const app = require('express');

const router = app.Router();
const reviewController = require('../controllers/reviewController')

router.get("/", reviewController.getAll);

module.exports = router;
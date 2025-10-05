const app = require('express');

const router = app.Router();
const cancionController = require('../controllers/cancionController')

router.get("/", cancionController.getAll);
router.get("/:id/reviews", cancionController.getReviewsByCancionId);
router.get("/:id", cancionController.getById);

module.exports = router;
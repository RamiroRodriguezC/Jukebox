const app = require('express');

const router = app.Router();
const cancionController = require('../controllers/cancionController')
const reviewController = require('../controllers/reviewController')

router.get('/search', cancionController.searchCanciones); 
router.get("/", cancionController.getAll);
//
// router.put("/:id",cancionController.updateCancion);  
router.get("/:id", cancionController.getById);
router.delete("/:id",cancionController.deleteCancion); 
router.get("/reviews/:id", reviewController.getSongReviews);

module.exports = router;
const app = require('express');

const router = app.Router();
const cancionController = require('../controllers/cancionController')

router.get('/search', cancionController.searchCanciones); 
router.get("/", cancionController.getAll);
//
router.get("/:id", cancionController.getById);


module.exports = router;
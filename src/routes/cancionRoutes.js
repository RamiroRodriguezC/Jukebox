const app = require('express');

const router = app.Router();
const cancionController = require('../controllers/cancionController')

router.get('/search', cancionController.searchCanciones); 
router.get("/", cancionController.getAll);
//
// router.put("/:id",cancionController.updateCancion);  
router.get("/:id", cancionController.getById);
router.delete("/:id",cancionController.deleteCancion); 


module.exports = router;
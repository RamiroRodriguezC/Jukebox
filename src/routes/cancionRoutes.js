const app = require('express');

const router = app.Router();
const cancionController = require('../controllers/cancionController')

router.get('/search', cancionController.searchCanciones); 
router.get("/", cancionController.getAll);
//
router.get("/:id", cancionController.getById);
router.delete("/:id",cancionController.deleteCancion);  // QUE EL DELETE SE HAGA SOBRE EL MISMO USUARIO QUE ESTA PIDIENDO ESE UPDATE O QUE LO HAGA UN ADMIN


module.exports = router;
const app = require('express');

const router = app.Router();
const artistaController = require('../controllers/artistaController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

router.get("/", artistaController.getAll);
router.get("/:id", artistaController.getById);
router.delete("/:id" ,authenticateToken, isAdmin,artistaController.deleteArtista);  // QUE EL DELETE SE HAGA SOBRE EL MISMO USUARIO QUE ESTA PIDIENDO ESE UPDATE O QUE LO HAGA UN ADMIN


module.exports = router;
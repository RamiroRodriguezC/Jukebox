const app = require('express');

const router = app.Router();
const albumController = require('../controllers/albumController');
const { authenticateToken,isAdmin } = require('../middlewares/authMiddleware');

router.get("/", albumController.getAll);
router.get("/:id", albumController.getById);
router.delete("/:id",authenticateToken, isAdmin,albumController.deleteAlbum);  // QUE EL DELETE SE HAGA SOBRE EL MISMO USUARIO QUE ESTA PIDIENDO ESE UPDATE O QUE LO HAGA UN ADMIN


module.exports = router;
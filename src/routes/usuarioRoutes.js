const app = require('express');

const router = app.Router();
const usuarioController = require('../controllers/usuarioController')
const {authenticateToken} = require("../middlewares/authMiddleware")

router.get("/",authenticateToken, usuarioController.getAll, );
router.get("/:id", usuarioController.getById);
router.post("/login", usuarioController.login);
router.delete("/:id",usuarioController.deleteUsuario);  // QUE EL DELETE SE HAGA SOBRE EL MISMO USUARIO QUE ESTA PIDIENDO ESE UPDATE O QUE LO HAGA UN ADMIN


module.exports = router;
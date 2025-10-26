const app = require('express');

const router = app.Router();
const usuarioController = require('../controllers/usuarioController')
const {authenticateToken} = require("../middlewares/authMiddleware")

router.get("/",authenticateToken, usuarioController.getAll, );
router.post("/create",usuarioController.createUsuario);
router.get("/:id", usuarioController.getById);
router.post("/:idUser/favorito/:idCancion", usuarioController.addCancionAFavorito);
router.post("/login", usuarioController.login);
router.put("/:id", usuarioController.updateUsuario);  // QUE EL UPDATE SE HAGA SOBRE EL MISMO USUARIO QUE ESTA PIDIENDO ESE UPDATE O QUE LO HAGA UN ADMIN
router.delete("/:id",usuarioController.deleteUsuario);  // QUE EL DELETE SE HAGA SOBRE EL MISMO USUARIO QUE ESTA PIDIENDO ESE UPDATE O QUE LO HAGA UN ADMIN
router.delete("/:idUser/favorito/:idCancion", usuarioController.removeFavorito);

module.exports = router;
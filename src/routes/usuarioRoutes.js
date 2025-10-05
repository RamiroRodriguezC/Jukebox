const app = require('express');

const router = app.Router();
const usuariosController = require('../controllers/usuarioController')

router.get("/", usuariosController.getAll);
router.get("/:id", usuariosController.getById);

module.exports = router;
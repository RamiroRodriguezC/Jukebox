const app = require('express');

const router = app.Router();
const usuarioController = require('../controllers/usuarioController')
const {authenticateToken} = require("../middlewares/authMiddleware")

router.get("/",authenticateToken, usuarioController.getAll, );
router.get("/:id", usuarioController.getById);
router.post("/login", usuarioController.login);

module.exports = router;
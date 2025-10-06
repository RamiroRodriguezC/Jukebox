const app = require('express');

const router = app.Router();
const artistaController = require('../controllers/artistaController')

router.get("/", artistaController.getAll);
router.get("/:id", artistaController.getById);

module.exports = router;
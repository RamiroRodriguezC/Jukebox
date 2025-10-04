const app = require('express');

const router = app.Router();
const artistaController = require('../controllers/artistaController')

router.get("/", artistaController.getAll);

module.exports = router;
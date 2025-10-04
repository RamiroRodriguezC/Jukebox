const app = require('express');

const router = app.Router();
const cancionController = require('../controllers/cancionController')

router.get("/", cancionController.getAll);

module.exports = router;
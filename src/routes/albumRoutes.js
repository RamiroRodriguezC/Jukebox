const app = require('express');

const router = app.Router();
const albumController = require('../controllers/albumController')

router.get("/", albumController.getAll);

module.exports = router;
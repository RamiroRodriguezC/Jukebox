const app = require('express');

const router = app.Router();
const albumController = require('../controllers/albumController')

router.get("/", albumController.getAll);
router.get("/:id", albumController.getById);

module.exports = router;
const app = require('express');

const router = app.Router();
const reviewController = require('../controllers/reviewController')

router.get("/", reviewController.getAll);
router.post("/create",reviewController.createReview);  
router.put("/:id",reviewController.updateReview);  // QUE EL UPDATE SE HAGA SOBRE EL MISMO USUARIO QUE ESTA PIDIENDO ESE UPDATE O QUE LO HAGA UN ADMIN
router.delete("/:id",reviewController.deleteReview);  // QUE EL DELETE SE HAGA SOBRE EL MISMO USUARIO QUE ESTA PIDIENDO ESE UPDATE O QUE LO HAGA UN ADMIN
router.get("/:id", reviewController.getById); 



module.exports = router;
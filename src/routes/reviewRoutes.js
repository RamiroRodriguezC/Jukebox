const app = require('express');

const router = app.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateToken, isAuthor } = require('../middlewares/authMiddleware');

router.get("/" , reviewController.getAll); 
router.post("/create" ,authenticateToken ,reviewController.createReview);  
router.put("/:id" ,authenticateToken,isAuthor,reviewController.updateReview);  // QUE EL UPDATE SE HAGA SOBRE EL MISMO USUARIO QUE ESTA PIDIENDO ESE UPDATE O QUE LO HAGA UN ADMIN
router.delete("/:id" ,authenticateToken,isAuthor,reviewController.deleteReview);  // QUE EL DELETE SE HAGA SOBRE EL MISMO USUARIO QUE ESTA PIDIENDO ESE UPDATE O QUE LO HAGA UN ADMIN
router.get("/:id", reviewController.getById); 



module.exports = router;
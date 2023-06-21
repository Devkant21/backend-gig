import express from "express";
import NCController from "./nc.controller"
import ReviewsController from "./reviews.controller"

const router = express.Router() //get access to express router
router.route("/").get(NCController.apiGetNC)

router
    .route("/review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)

export default router
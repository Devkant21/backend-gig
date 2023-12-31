import ReviewsDAO from "../dao/reviewDAO"

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const ncId = req.body.nc_id
            const review = req.body.review
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()
            const ReviewResponse = await ReviewsDAO.addReview(movieId,
                userInfo, review, date
            )
            res.json({ status: "success " })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}




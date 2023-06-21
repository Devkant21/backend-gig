import NCDAO from "../dao/ncDAO";

export default class NCController {
    static async apiGetNC(req, res, next) {
        const ncPerPage = req.query.ncPerPage ? parseInt(req.query.ncPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0

        let filters = {}
        if (req.query.rated) {
            filters.rated = req.query.rated
        }
        else if (req.query.title) {
            filters.title = req.query.title
        }
        const { ncList, totalNumNC } = await NCDAO.getNC({ filters, page, ncPerPage })

        let response = {
            nc: ncList,
            page: page,
            filters: filters,
            entries_per_page: ncPerPage,
            total_results: totalNumNC,
        }
        res.json(response)
    }

    static async apiGetMovieById(req, res, next) {
        try {
            let id = req.params.id || {}
            let movie = await MoviesDAO.getMovieById(id)
            if (!movie) {
                res.status(404).json({ error: "not found" })
                return
            }
            res.json(movie)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
    static async apiGetRatings(req, res, next) {
        try {
            let propertyTypes = await MoviesDAO.getRatings()
            res.json(propertyTypes)
        }
        catch (e) {
            console.log(`api,${e}`)
            res.status(500).json({ error: e })
        }
    }
}

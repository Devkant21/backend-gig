import NCDAO from "../dao/ncDAO";

export default class MCController {
    static async apiGetNC(req, res, next) {
        const ncPerPage = req.query.ncPerPage ? parseInt(req.query.ncPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0

        let filters = {}
        if(req.query.rated) {
            filters.rated = req.query.rated
        }
        else if(req.query.title){
            filters.title = req.query.title
        }
        const { ncList, totalNumNC } = await NCDAO.getNC({ filters,page,ncPerPage })

        let response = {
            nc : ncList,
            page : page,
            filters : filters,
            entries_per_page : ncPerPage,
            total_results : totalNumNC,
        }
        res.json(response)
    }
}
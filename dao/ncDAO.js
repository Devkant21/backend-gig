import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let nc

export default class NCDAO {
    static async injectDB(conn) {
        if (nc) {
            return
        }
        try {
            nc = await conn.db(process.env.NCREVIEWS_NS).collection('nc')
        }
        catch (e) {
            console.error(`unable to connect in NCDAO:${e}`)
        }
    }

    static async getNC({// default filter
        filters = null,
        page = 0,
        ncPerPage = 20, // will only get 20 movies at once
    } = {}) {
        let query
        if (filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters['title'] } }
            } else if ("rated" in filters) {
                query = { "rated": { $eq: filters['rated'] } }
            }
        }
        let cursor
        try {
            cursor = await movies
                .find(query)
                .limit(ncPerPage)
                .skip(ncPerPage * page)
            const ncList = await cursor.toArray()
            const totalNumNC = await nc.countDocuments(query)
            return { ncsList, totalNumNC }
        }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { ncList: [], totalNumNCs: 0 }
        }
    }

    static async getRatings() {
        let ratings = []
        try {
            ratings = await movies.distinct("rated")
            return ratings
        }
        catch (e) {
            console.error(`unable to get ratings, $(e)`)
            return ratings
        }
    }

    static async getMovieById(id) {
        try {
            return await movies.aggregate([{
                $match: {
                    _id: new ObjectId(id),
                }
            },
            {
                $lookup: {
                    from: 'reviews', localField: '_id', foreignField: 'movie_id',
                    as: 'reviews',
                }
            }]).next()
        } catch (e) {
            console.error(`something went wrong in getMovieById: ${e}`)
            throw e
        }
    }
}
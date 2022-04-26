const News = require('../models/news')

exports.getNews = async (req, res) => {
    try {
        const { archiveNews } = req.query
        if (!archiveNews) {
            const allNews = await News.find({ archiveDate: null || undefined })
            res.send(allNews)
        } else {
            const archivedNews = await News.find({ archiveDate: { $ne: null || undefined } })
            res.send(archivedNews)
        }
    } catch (error) {
        next(error)
    }

}

exports.postNews = async (req, res, next) => {
    try {
        const { title, description, content, author } = req.body
        const postNews = new News({
            title,
            description,
            date: new Date(),
            content,
            author
        });

        await postNews.save()
        res.send(postNews)
    } catch (error) {
        next(error)
    }
}

exports.archiveNews = async (req, res) => {
    try {
        const { id } = req.query
        let newUpdate = await News.findByIdAndUpdate({ _id: id }, { archiveDate: new Date() })
        res.send(newUpdate)
    } catch (error) {
        next(error)
    }

}

exports.deleteNews = async (req, res) => {
    try {
        const { id } = req.query

        if (id) {
            const deleteNews = await News.deleteOne({ _id: id })
            res.send(deleteNews)
        } else {
            //Just to be able to delete all the data
            const deleteNews = await News.deleteMany()
            res.send(deleteNews)
        }
    } catch (error) {
        next(error)
    }
}
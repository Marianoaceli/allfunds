require('dotenv').config()
const axios = require('axios')
const News = require('../models/news')


exports.populateDB = async () => {
    try {
        const date = new Date()
        date.setDate(date.getDate() - 1)
        const today = date.toISOString().split('T')[0]
        const archivedNews = await News.find({ date: today })

        if (archivedNews.length === 0) {
            const { data: { articles } } = await axios.get(`${process.env.API_URL}&from=${today}&to=${today}`)
            const currentNews = articles.slice(0, 5)
            for (let i = 0; i < currentNews.length; i++) {

                const postNews = new News({
                    title: currentNews[i].title,
                    description: currentNews[i].description,
                    date: i === 4 ? today.replace('2022', '2021') : today,
                    content: currentNews[i].content,
                    author: currentNews[i].author
                });

                await postNews.save()
            }
        }

    } catch (error) {
        console.log('Error pupolateDB' + error)
    }
}
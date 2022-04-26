const express = require('express')
const router = express.Router()

const { getNews, postNews, deleteNews,archiveNews } = require('../controllers/news')

router.get('/', getNews)

router.put('/archive', archiveNews)

router.post('/newsPost', postNews)

router.delete('/delete', deleteNews)

module.exports = router
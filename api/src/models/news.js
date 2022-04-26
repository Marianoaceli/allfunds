const mongoose = require("mongoose")

const newsSchema = mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	date: { type: Date, required: true },
	content: { type: String, required: true },
	author: { type: String, required: true },
	archiveDate: { type: Date, required: false }
})

module.exports = mongoose.model("News", newsSchema)
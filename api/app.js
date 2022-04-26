require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose")
const { populateDB } = require('./src/utils/utils')
const app = express()

//app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
//app.use(cookieParser());
//app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const routes = require('./src/routes/news')

app.use('/news', routes)

app.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).send(message);
});

process.on('uncaughtException', error => {
  console.log(error)
})

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(async () => {

    await populateDB()

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
    })
  })
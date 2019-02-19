const express = require('express')
const path = require('path')
const indexRouter = require('./routes/indexRoute')
const port = process.env.PORT || 3000;

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use('/', indexRouter);

app.listen(port)
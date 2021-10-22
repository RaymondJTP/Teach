const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const router = require('./routes/index')
const session = require('express-session')


app.set('view engine', 'ejs')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
  
app.use(express.urlencoded({extended: true}))
app.use('/', router)



app.listen(port,function() {
    console.log('Berhasil');
})
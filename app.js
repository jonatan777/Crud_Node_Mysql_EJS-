var express = require('express');
var app = express();
var mysql = require('mysql2');
var myConnection  = require('express-myconnection');
const consign = require('consign');

//configuração do banco
var config = require('./config')
var dbOptions = {
		host:	  config.database.host,
		user: 	  config.database.user,
		password: config.database.password,
		port: 	  config.database.port, 
		database: config.database.db
}
//conexão com o banco
app.use(myConnection(mysql, dbOptions, 'pool'))


app.set('view engine', 'ejs')


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var methodOverride = require('method-override') 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))


var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({ 
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
app.use(flash())

 


consign({})
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app)
;




module.exports = app;
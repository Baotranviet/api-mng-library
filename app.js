let express = require('express')
let morgan = require('morgan')
let bodyParser = require('body-parser')
let expressValidator = require('express-validator')
let session = require('express-session');
let MySQLStore = require('express-mysql-session')(session);
let userController = require('./src/users/userController');
let authorController = require('./src/authors/authorController');
let app = express()
let PORT = 8080

let options = {
  host: "localhost",
  port: "127.0.0.1",
  user: "root",
  password: null,
  database: "api-mng-library"
};
let sessionStore = new MySQLStore(options);

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: true,
  saveUninitialized: false
}));
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())

app.use("/", userController);
app.use("/authors", authorController);

app.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
})

module.exports = app; 
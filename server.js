const config = require('dotenv')
config.config({ path: './config/config.env' })
const http = require('http')
const express = require('express')
const app = express()
const path = require('path')
const { ConnectMongoDB } = require('./config/DB')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo')
const cors = require('cors');
const fileUpload = require('express-fileupload');
// const morgan = require('morgan');
// const _ = require('lodash');
const server = http.createServer(app)

// body parser setup
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// static folder

app.use(express.static(path.join(__dirname, 'public')))

// Set up view engine and layouts
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)

// session options
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(cors());

app.use(fileUpload({
  createParentPath: true,
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
  },
}));
// various local formats
const { formatDate } = require('./middleware/formats')
app.use((req, res, next) => {
  res.locals.formatDate = formatDate

  next()
})

// Routes
const { ensureGuest, ensureAuth } = require('./middleware/auth')


app.use('/', require('./controllers/unauth'))
app.use('/auth', require('./controllers/googleAuth'))
app.use('/local', require('./controllers/localAuth'))
app.use('/dashboard', ensureAuth, require('./controllers/dashboard'))
app.use('/ajax', ensureAuth, require('./controllers/ajax_calls'))
app.use('/blog', ensureAuth, require('./controllers/blog'))
app.use('/mailbox', ensureAuth, require('./controllers/email'))
app.use('/calendar', ensureAuth, require('./controllers/calendar'))

// connect to MongoDB
ConnectMongoDB();

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
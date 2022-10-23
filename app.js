const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());    // takes the JSON data that is sent in a request and parses it and attaches it to the request object
app.use(cookieParser());

app.set('view engine', 'ejs');

//database connection
const dbURI = 'mongodb+srv://samarth:kJlxM9CBaLZK0vb7@cluster0.ztluc6u.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true,  useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


//routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

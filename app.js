if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const thoughtsRoutes = require('./routes/thoughts');

const app = express();
const dbUrl = process.env.ATLASDB_URL;
const PORT = process.env.PORT || 3000;

mongoose.connect(dbUrl)
    .then(() => console.log("Cloud Database Connected"))
    .catch((err) => console.log("Database Error:", err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use('/', thoughtsRoutes);

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
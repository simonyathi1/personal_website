const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.port || 3000;

//setup template engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//setup express static public folder for css and js images
app.use(express.static('public'));

app.get('/',(req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
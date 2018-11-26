const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const keys = require('./config/keys');

mongoose.connect(keys.MongoURI).then(() => {
    console.log('Remote MongoDB connected...')
});

//setup environment variables
const port = process.env.PORT || 3000;
const Schema = mongoose.Schema;

//setup template engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//setup express static public folder for css and js images
app.use(express.static('public'));

//setup bodyparser to encode url
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//create collection with mongoose
const Message = mongoose.model('message', new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    }
}));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});
//setup the post method from the form attributes
app.post('/getMessage', (req, res) => {
    const newMessage = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    }
    new Message(newMessage).save()
        .then(() => {
            res.render('inbox')
        });
});

app.get('/displayMessage', (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) {
            console.log(err);
        } else {
            res.render('displayMessage', {
                messages: messages
            })
        }
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const app = express();

const path = require('path');
const serveStatic = require('serve-static');
app.use(serveStatic(path.join(__dirname, '/')));

// const keys = require('./config/keys');
//
// mongoose.connect(keys.MongoURI).then(() => {
//     console.log('Remote MongoDB connected...')
// });

//setup environment variables
const port = process.env.PORT || 3000;

//setup template engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//setup express static public folder for css and js images
app.use(express.static('personal_website'));

//setup bodyparser to encode url
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//create collection with mongoose
/*const Message = mongoose.model('message', new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}));*/

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/education', (req, res) => {
    res.render('education');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/portfolio-details', (req, res) => {
    res.render('portfolio-details');
});

//setup the post method from the form attributes
app.post('/getMessage', (req, res) => {
    const newMessage = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        subject: req.body.subject
    };
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'onesimonyathi.online@gmail.com',
            pass: 'Bondlile.99'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let HelperOptions = {
        from: newMessage.name + ": " + newMessage.email,
        to: 'simonyathi1@gmail.com',
        subject: newMessage.subject + '***Website Contact Form***',
        text: newMessage.message + ": \n\n" + newMessage.email
    };

    console.log(newMessage.message);
    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log("The message was sent!");
            console.log(info);
            res.render('inbox');
        }
    });
});

/*app.get('/displayMessage', (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) {
            console.log(err);
        } else {
            res.render('displayMessage', {
                messages: messages
            })
        }
    });
});*/

app.get('/portfolio', (req, res) => {
    res.render('portfolio');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
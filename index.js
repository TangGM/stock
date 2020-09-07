const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');

const PORT = process.env.PORT || 5000;

// API key pk_ff385012735d4dee8c75bc10bb484cd5
function call_api(doneAPI) {
    request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_ff385012735d4dee8c75bc10bb484cd5', {json: true},
    (err,res, body) => {
        if (err) { return console.log(err); }
        console.log(body);
        if (res.statusCode === 200) {
            // console.log(body);
            doneAPI(body);
        }
    });
};


// set handlebars middlewares
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// set handlebar routes
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
            res.render('home', {
                stock: doneAPI
            });
    });
});

// create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// set a static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('server listening on port ' + PORT));

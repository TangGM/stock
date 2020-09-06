const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

// set handlebars middlewares
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherStuff = "hello this is other sutff";


// set handlebar routes
app.get('/', function (req, res) {
    res.render('home', {
        stuff: otherStuff
    });
});

// set a static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('server listening on port ' + PORT));

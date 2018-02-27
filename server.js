const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes for static content, pages, and api
app.use(express.static(__dirname + '/app/public'));
app.use('/', require('./app/routing/htmlRoutes'));
app.use('/api', require('./app/routing/apiRoutes'));


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', require('./routing/htmlRoutes'));
app.use('/api', require('./routing/apiRoutes'));


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
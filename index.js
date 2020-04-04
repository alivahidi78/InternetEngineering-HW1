const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const ph = require('./polygons/polygon_handler');
const logUtil = require('./logging/logUtil');
dotenv.config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(PORT, HOST, () => console.log(`listening on ${HOST}:${PORT}`));
app.use('/', bodyParser.json());
app.use('/', logUtil);
app.get('/gis/testpoint', ph.respond);
app.put('/gis/addpolygon', ph.addAndRespond);

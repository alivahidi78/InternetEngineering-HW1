const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const ph = require('./polygons/polygon_handler');
dotenv.config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(PORT, HOST, () => console.log(`listening on ${HOST}:${PORT}`));
app.get('/gis/testpoint', ph.respond);
app.use('/gis/addpolygon', bodyParser.json());
app.put('/gis/addpolygon', ph.addAndRespond);

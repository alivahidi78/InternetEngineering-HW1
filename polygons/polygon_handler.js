const t_inside = require('turf-inside');
const GJV = require("geojson-validation");
const db = require('../database/db');
const logger = require('../logging/logger');

let respond = (req, res) => {
    let position = [
        Number(req.query.long),
        Number(req.query.lat)
    ]
    if ((!isFinite(position[0])) || (!isFinite(position[1]))) {
        logger.log('error', '400 REQUEST DENIED - longitude and latitude entered are not valid');
        res.status(400).send("Bad Request");
        return;
    }
    let results = { polygons: [] }
    let polygons;
    db.getRawData.then((value) => {
        polygons = value.features;
        for (let p of polygons) {
            if (t_inside(position, p))
                results.polygons.push(p.properties.name);
        }
        logger.log('info', '200 REQUEST GRANTED - list of polygons retreived');
        res.status(200).json(results);
    }).catch((reason) => {
        logger.log('error', '500 REQUEST DENIED - ' + reason);
        res.status(500).send("Internal Server Error");
    })
}

let addAndRespond = (req, res) => {
    let polygon = req.body;
    //Checking for validness of polygon
    if (GJV.isFeature(polygon)) {
        db.addPolygon(polygon).then(()=>{
            logger.log('info', '200 Polygon added');
            res.status(200).send('DONE');
        })
            .catch((reason) => {
                logger.log('error', '500 REQUEST DENIED - ' + reason);
                res.status(500).send("Internal Server Error");
            });
    } else {
        logger.log('error', '400 REQUEST DENIED - invalid polygon');
        res.status(400).send("Bad Request");
    }
}

module.exports = { respond, addAndRespond };
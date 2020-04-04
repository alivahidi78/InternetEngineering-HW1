const t_inside = require('turf-inside');
const GJV = require("geojson-validation");
const db = require('../database/db');

let respond = (req, res) => {
    let position = [
        Number(req.query.long),
        Number(req.query.lat)
    ]
    if ((!isFinite(position[0])) || (!isFinite(position[1]))) {
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
        res.status(200).json(results);
    }).catch((reason) => {
        //TODO log
        res.status(500).send("Internal Server Error");
    })
}

let addAndRespond = (req, res) => {
    let polygon = req.body;
    //Checking for validness of polygon
    if (GJV.isFeature(polygon)) {
        db.addPolygon(polygon).then(res.status(200).send('DONE'))
            .catch((reason) => {
                //TODO log
                res.status(500).send("Internal Server Error");
            });
    } else {
        //TODO log
        res.status(400).send("Bad Request");
    }
}

module.exports = { respond, addAndRespond };
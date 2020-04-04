const t_inside = require('turf-inside');
const GJV = require("geojson-validation");
const db = require('../database/db');

let respond = (req, res) => {
    let position = [
        Number(req.query.long),
        Number(req.query.lat)
    ]
    let results = { polygons: [] }
    let polygons;
    db.getRawData.then((value) => {
        polygons = value.features;
        for (let p of polygons) {
            if (t_inside(position, p))
                results.polygons.push(p.properties.name);
        }
        res.json(results);
    })
    //TODO add Error
}

let addAndRespond = (req, res) => {
    let polygon = req.body;
    //Checking for validness of polygon
    if (GJV.isFeature(polygon)) {
        db.addPolygon(polygon)
        // .then(res.send('DONE'));
    }
    //TODO add Error
    res.send('DONE');
}

module.exports = { respond, addAndRespond };
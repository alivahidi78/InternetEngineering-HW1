const t_inside = require('turf-inside');
const db = require('../database/db');

let respond = (req, res) => {
    let position = [
        Number(req.query.long),
        Number(req.query.lat)
    ]
    let results = { polygons: [] }
    let polygons;
    db.getPolygons.then((value) => {
        polygons = value;
        for (let p of polygons) {
            if (t_inside(position, p))
                results.polygons.push(p);
        }
        res.json(results);
    })
}

module.exports = { respond };
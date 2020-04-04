const fs = require('fs');

let getPolygons = new Promise((resolve, reject) => {
    fs.exists('./database/data.json', (exists) => {
        if (exists) {
            fs.readFile('./database/data.json', (err, data) => {
                if (!err) {
                    resolve(JSON.parse(data).features);
                } else {
                    reject('Cannot read database');
                }
            })
        }else{
            reject('Database file does not exist');
        }
    })
})

module.exports = { getPolygons };
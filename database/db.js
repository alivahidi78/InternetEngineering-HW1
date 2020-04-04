const fs = require('fs');

let getRawData = new Promise((resolve, reject) => {
    fs.exists('./database/data.json', (exists) => {
        if (exists) {
            fs.readFile('./database/data.json', (err, data) => {
                if (!err) {
                    resolve(JSON.parse(data));
                } else {
                    reject('Cannot read database');
                }
            })
        } else {
            reject('Database file does not exist');
        }
    })
})

let writeRawData = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./database/data.json',JSON.stringify(data), (err) => {
            if (!err)
                resolve();
            else
                reject();
        })
        //TODO CHECK FOR ERROR
    })
}

let addPolygon = (polygon) => {
    getRawData.then((value) => {
        value.features.push(polygon);
        return writeRawData(value);
    })
}

module.exports = { getRawData, addPolygon };
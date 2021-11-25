const http = require('http');

class MyAxios {
    constructor(path) {
        this.path = path;
    }

    get(id) {
        const path = id ? this.path + '/' + id : this.path;
        let result = '';
        return new Promise((resolve, reject) => {
            http.get(path, (resp) => {
                resp.on('data', (chunk) => {
                    result += chunk;
                });
                resp.on('end', (chunk) => {
                    resolve(JSON.parse(result));

                });
            }).on("error", (err) => {
                reject("Error: " + err.message);
            });
        })
    }

    post(body) {
        body = JSON.stringify(body);
        const options = {
            method: 'POST',
            hostname: "127.0.0.1",
            path: '/person',
            port: 3068,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
        return new Promise(async (resolve, reject) => {
            let response = '';
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    response += chunk;
                });
                res.on('end', (chunk) => {
                    resolve(JSON.parse(response));
                });

            }).on("error", (err) => {
                reject("Error: " + err.message);
            });
            req.write(body);
            req.end();
        })

    }
};

module.exports = MyAxios;

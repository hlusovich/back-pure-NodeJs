const users = require('./controller/Users');
const {Buffer} = require('buffer');
const errorHandler = require('./errorHandler/errorHandler');
const MyError = require('./MyError/MyError');
const personFieldsValidator = require('./validators/personFieldsValidator');
const runApp = (req, res) => {
    try {
        const path = req.url.split("/").filter(item => !!item);
        if (path[0] === "person" && path.length === 1) {
            switch (req.method) {
                case "GET":
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify(users.getAllUsers()));
                    break;
                case "POST":
                    res.writeHead(201, {"Content-Type": "application/json"});
                    const body = [];
                    req.on('data', (data) => {
                        body.push(Buffer.from(data));
                    });
                    req.on('end', () => {
                        try {
                            const person = JSON.parse(body.toString());
                            personFieldsValidator(person);
                            res.end(JSON.stringify(users.addUser(person)));
                        } catch (e) {
                            errorHandler(e, res);
                        }
                    });
                    break;
            }
        } else if (path[0] === "person" && path.length === 2) {
            switch (req.method) {
                case "GET":
                    const user = JSON.stringify(users.getUser(path[1]));
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(user);
                    break;
                case "PUT":
                    const body = [];
                    res.writeHead(200, {"Content-Type": "application/json"});
                    req.on('data', (data) => {
                        body.push(Buffer.from(data));
                    });
                    req.on('end', () => {
                        try {
                            let person = null;
                            person = JSON.parse(body.toString());
                            person = users.editUser(path[1], person);
                            res.writeHead(200, {"Content-Type": "application/json"});
                            res.end(JSON.stringify(person));
                        } catch (e) {
                            errorHandler(e, res);
                        }
                    });
                    break;
                case "DELETE":
                    if (users.deleteUser(path[1])) {
                        res.writeHead(204, {"Content-Type": "application/text"});
                        res.end(`Person  was deleted`);
                    }
                    break;
            }
        } else {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end("This path isn't exist 404");
        }
    } catch (e) {
        errorHandler(e, res);
    }

};

module.exports = runApp;

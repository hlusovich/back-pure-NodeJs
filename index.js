const http = require('http');
require('dotenv').config();
const PORT = process.env.PORT || 3005;
const users = require('./controller/Users');
const {Buffer} = require('buffer');
const server = http.createServer((req, res) => {
    console.log(req.body)
    res.writeHead(200, {"Content-Type": "text/json"});
    switch (req.method) {
        case "GET":
            res.end(JSON.stringify(users.getAllUsers()));
            break;
        case "POST":
            const body = [];
            req.on('data', (data) => {
                body.push(Buffer.from(data));
            });
            req.on('end', () => {
                const user = {name: body.toString().split("=")[1]};
                users.addUser(user);
            });
            res.end();
            break;
        case "PUT":
            res.end();
            break;
        case "DELETE":
            res.end();
            break;

    }

});
server.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
});

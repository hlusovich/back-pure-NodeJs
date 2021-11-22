const http = require('http');
require('dotenv').config();
const PORT = process.env.PORT || 3005;
const users = require('./controller/Users');
const {Buffer} = require('buffer');
const server = http.createServer((req, res) => {
    const path = req.url.split("/").filter(item=> !!item);
    if (path[0] === "person" && path.length === 1) {
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
        }
    }
   else if (path[0] === "person" && path.length === 2) {
      res.writeHead(200, {"Content-Type": "text/json"});
      switch (req.method) {
         case "GET":
            res.end(JSON.stringify(users.getUser(path[1])));
            break;
         case "PUT":
            const body = [];
            req.on('data', (data) => {
               body.push(Buffer.from(data));
            });
            req.on('end', () => {
               const user = {name: body.toString().split("=")[1]};
               users.editUser(path[1],user);
            });
            res.end();
            break;
         case "DELETE":
            users.deleteUser(path[1]);
            res.end();
            break;
      }
   }


});
server.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
});

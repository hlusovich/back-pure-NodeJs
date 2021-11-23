const http = require('http');
require('dotenv').config();
const PORT = process.env.PORT || 3005;
const users = require('./controller/Users');
const {Buffer} = require('buffer');
const server = http.createServer((req, res) => {
    const path = req.url.split("/").filter(item=> !!item);
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
                    const user = {name: body.toString().split("=")[1]};
                    res.end(users.addUser(user));
                });

                break;
        }
    }
   else if (path[0] === "person" && path.length === 2) {
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
            break;
      }
       res.writeHead(200, {"Content-Type": "application/json"});
       res.end();
   }
   else{
       res.writeHead(404, {"Content-Type": "application/json"});
       res.end("Такого пути не найдено 404");
    }


});
server.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
});

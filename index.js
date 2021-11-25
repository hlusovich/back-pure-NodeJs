const http = require('http');
require('dotenv').config();
const PORT = process.env.PORT || 3005;
const runApp = require('./app.js');
let server = null;
const start = () => {
    return new Promise((res, rej) => {
        try{
            server = http.createServer(runApp);
            server.listen(PORT, () => {
                console.log(`Server is running ${PORT}`);
                res(`Server is running ${PORT}`);
            });
        }
        catch(e){
            rej(e.message);
        }

    });

};
module.exports = start;

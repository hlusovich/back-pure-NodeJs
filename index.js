const http = require('http');
require('dotenv').config();
const PORT = process.env.PORT || 3005;
const runApp = require('./app.js');
const server = http.createServer(runApp);
server.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
});

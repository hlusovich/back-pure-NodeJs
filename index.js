const http = require('http');
const server = http.createServer((req,res)=>{
   if(req.method ==="GET"){
      res.writeHead(200, {"Content-Type": "text/json"});
      res.end(JSON.stringify({
         user:"Man"
      }));
   }

});
server.listen(3000, ()=>{
   console.log(`Server is running`)
});

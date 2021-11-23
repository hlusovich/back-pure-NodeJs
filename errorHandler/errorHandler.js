const MyError = require('../MyError/MyError');
const errorHandler = (error,res)=>{
  if(error instanceof MyError){
      res.writeHead(error.status, {"Content-Type": "application/json"});
      res.end(error.message)
  }
  else{
      res.writeHead(500, {"Content-Type": "application/json"});
      res.end("Unknown server error " + error.message);
  }
    };

module.exports = errorHandler;

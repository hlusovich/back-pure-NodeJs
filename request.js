const http = require('http');
const path = `http://localhost:${3068}/person`;
let data = '';
const MyAxios = require('./myAxios/MyAxios');
const myAxios = new MyAxios(path);
(async () => {
    try{
        console.log("start")
        console.log(await myAxios.get())
        console.log( await myAxios.post(JSON.stringify({name:"Mikita"})))
        console.log("start2")
    }
     catch (e) {
         console.log(e)
     }
    }
)();

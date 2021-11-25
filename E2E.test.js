const {expect,describe, beforeAll, afterAll} = require("@jest/globals");
const child_process = require("child_process");
let subscription = null;
require('dotenv').config();
const MyAxios = require('./myAxios/MyAxios');
const path = `http://localhost:${3068}/person`;
const myAxios = new MyAxios(path);
const freshPeron = {name:"KIVI"};
const moreFreshPeron = {name:"KIVI2"};
let id ='';

describe( "Server tests", ()=>{
    beforeAll( async ()=>{
      // subscription =  await child_process.fork("./index.js");
    });
    afterAll(()=>{
        // process.kill(subscription.pid);
    });
    test("method GET should return empty array", async ()=>{
        try{
            const result = await myAxios.get();
            expect(result).toEqual([]);
            expect(result.length).toBe(0);
        }
        catch (e) {
            console.log(e)
        }

    });
    test("method POST should return fresh created object", async ()=>{
        try{
            const result = await myAxios.post(freshPeron);
            expect(result.name).toBe(freshPeron.name);
        }
        catch (e) {
            console.log(e)
        }

    });
    test("method POST should return more fresh created object", async ()=>{
        try{
            const result = await myAxios.post(moreFreshPeron);
            id = result.id;
            expect(result.name).toBe(moreFreshPeron.name);
        }
        catch (e) {
            console.log(e)
        }

    });
    test("method GET should return 2 persons", async ()=>{
        try{

            const result = await myAxios.get();
            expect(result.length).toBe(2);
        }
        catch (e) {
            console.log(e)
        }

    });
    test("method GET should return second person", async ()=>{
        try{

            const result = await myAxios.get(id);
            expect(result.name).toBe(moreFreshPeron.name);
            expect(result.id).toBe(id);
        }
        catch (e) {
            console.log(e)
        }

    });
});

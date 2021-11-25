const {expect, describe, beforeAll, afterAll} = require("@jest/globals");
const runApp = require('./index');
require('dotenv').config();
const MyAxios = require('./myAxios/MyAxios');
const path = `http://localhost:${process.env.PORT}/person`;
const myAxios = new MyAxios(path, process.env.PORT);
const freshPeron = {name: "KIVI"};
const moreFreshPeron = {name: "KIVI2"};
let server = null;
let id = '';
jest.setTimeout(20000)
describe("Server tests", () => {
    beforeAll(
        async () => {
            server = await runApp();
        });
    afterAll(() => {
        server.close();
    });
    test("method GET should return empty array", async () => {
        try {
            const result = await myAxios.get();
            expect(result).toEqual([]);
            expect(result.length).toBe(0);
        } catch (e) {
            console.log(e)
        }

    });
    test("method POST should return fresh created object", async () => {
        try {
            const result = await myAxios.post(freshPeron);
            expect(result.name).toBe(freshPeron.name);
        } catch (e) {
            console.log(e)
        }

    });
    test("method POST should return more fresh created object", async () => {
        try {
            const result = await myAxios.post(moreFreshPeron);
            id = result.id;
            expect(result.name).toBe(moreFreshPeron.name);
        } catch (e) {
            console.log(e)
        }

    });
    test("method GET should return 2 persons", async () => {
        try {

            const result = await myAxios.get();
            expect(result.length).toBe(2);
        } catch (e) {
            console.log(e)
        }

    });
    test("method GET to person/{id} should return second person", async () => {
        try {
            const result = await myAxios.get(id);
            expect(result.name).toBe(moreFreshPeron.name);
            expect(result.id).toBe(id);
        } catch (e) {
            console.log(e)
        }

    });
    test("method PUT should return changed object but with old id", async () => {
        const editInfo = {name: "newUSer"};
        const result = await myAxios.put(editInfo, id);
        expect(result.id).toBe(id);
        expect(result.name).toBe(editInfo.name);
    });
    test("method GET should return all persons", async () => {
        try {

            const result = await myAxios.get();
            expect(result.length).toBe(2);
        } catch (e) {
            console.log(e)
        }

    });
    test("method DELETE should delete person by id", async () => {
        try {
            myAxios.delete(id);
            const result = await myAxios.get();
            expect(result.length).toBe(1);
        } catch (e) {
            console.log(e)
        }

    });
});

# Node.JS Q4 2021 Task 3
First of all  you need to do npm install.
# Run:
If you want to run application in development mode use command : start:dev ( nodemon index.js ) npm run start:dev
If you want to run application in production mode use command : start:prod   npm run start:prod

#Example
npm run start:prod
npm run start:dev

#Description:
This app is server with all main CRUD operations.
GET /person:
Server returns all persons and status code 200;
GET /person/{personId}:
Server returns  person, who has this id  and status code 200;
If personId is invalid uuid server returns   status code 400 and appropriate message;
If person with this id isn't exist  server returns   status code 404 and appropriate message;
POST /person
Server returns  fresh created person and status code 201;
Server returns  status code 400, if request body doesn't  contains required fields;
PUT /person/{personId}
Server returns  updated  person and status code 200;
If personId is invalid uuid server returns  status code 400 and appropriate message;
If person with this id isn't exist  server returns   status code 404 and appropriate message;
DELETE /person/{personId}
Server returns  status code 204 and appropriate message, if person is found and deleted;
If personId is invalid uuid server returns  status code 400 and appropriate message;
If person with this id isn't exist  server returns   status code 404 and appropriate message;

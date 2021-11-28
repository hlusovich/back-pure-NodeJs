const MyError = require("../MyError/MyError");

function personFieldsValidator(person) {
    if (!person.hasOwnProperty("name") || typeof person.name !== "string") {
        throw new MyError("Field name is required and must be string", 400);
    }
    if (!person.hasOwnProperty("age") ||  typeof person.age !== "number") {
        throw new MyError("Field age is required and must be number", 400);
    }
    if (!person.hasOwnProperty("hobbies") ||  !Array.isArray(person.hobbies)) {
        throw new MyError("Field hobbies is required and must be  array of strings", 400);
    }
    if (person.hobbies.length && !person.hobbies.every(item => typeof item === "string")) {
        throw new MyError("Field hobbies is required and must be array of strings", 400);
    }
}

module.exports = personFieldsValidator;

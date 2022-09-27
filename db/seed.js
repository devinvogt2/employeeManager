const client = require("./client");
const { rebuildDB } = require("./dbData");

rebuildDB()
    //  .then(populateInitialData)
    .catch(console.error)
    .finally(() => client.end());

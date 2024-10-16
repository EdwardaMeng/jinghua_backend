module.exports = app => {
    const scripts = require("../controllers/script.controller.js");

    const router = require("express").Router();

    // Create a new Tutorial
    router.post("/uploadScript", scripts.create);

    // Retrieve all Tutorials
    router.get("/", scripts.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:name", scripts.findOne);
    //
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
    //
    // Delete a Tutorial with id
    router.delete("/:name", scripts.delete);
    app.use('/api/scripts', router);
};
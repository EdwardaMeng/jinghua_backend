module.exports = app => {
    const DMs = require("../controllers/dm.controller.js");

    const router = require("express").Router();

    router.get("/getAllDm", DMs.getAllDm);

    router.post("/createDm", DMs.createDm);

    router.put("/updateDm/:name", DMs.updateDm);

    router.delete("/deleteDm/:name", DMs.deleteDm);

    app.use('/api/dm', router);
};
module.exports = app => {
    const timeslots = require("../controllers/timeslot.controller");
    const router = require("express").Router();
    const multer = require('multer')

    router.post("/uploadTimeslot", timeslots.uploadTimeslot);

    router.post("/reserveTimeslot/:period", timeslots.reserveTimeslot)

    router.get("/getAllTimeslotsByName/:name", timeslots.getAllTimeslotsByName);

    router.get("/getAllAvailableTimeslotsByName/:name", timeslots.getAllAvailableTimeslotsByName);

    router.delete("/deleteTimeslot/:dm/:period", timeslots.deleteTimeslot);

    app.use('/api/timeslot', router);
};
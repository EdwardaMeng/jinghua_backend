module.exports = app => {
    const reservations = require("../controllers/reservation.controller.js");

    const router = require("express").Router();

    router.get("/getAllReservations", reservations.getAllReservations)

    router.post("/createReservation", reservations.createReservation);

    app.use('/api/reservation', router);
};
module.exports = app => {
    const admins = require("../controllers/admin.controller.js");

    const router = require("express").Router();

    router.post("/login", admins.login);

    app.use('/api/admin', router);
};
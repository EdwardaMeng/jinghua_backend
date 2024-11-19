module.exports = app => {
    const scripts = require("../controllers/script.controller.js");
    const router = require("express").Router();
    const multer = require('multer')
    const upload = multer({storage: multer.memoryStorage({})})

    router.post("/uploadScript", scripts.create);

    router.get("/getAllScripts", scripts.findAll);

    router.get("/getScriptsByPlayersNumber/:playersNumber", scripts.findScriptByPlayersNumber);

    router.get("/getScriptsByType/:type", scripts.findScriptByType);

    router.get("/getScriptsByTypeAndPlayersNumber/:type/:number", scripts.findScriptByTypeAndPlayersNumber);

    router.get("/:name", scripts.findScript);

    router.put("/updateScript/:name", scripts.update);

    router.delete("/deleteScript/:name", scripts.delete);

    app.use('/api/script', router);
};
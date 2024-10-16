const db = require("../models");
const Script = db.scripts;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    const script = {
        scriptName: req.body.scriptName,
        scriptPrice: req.body.scriptPrice,
        scriptType: req.body.scriptType,
        scriptPlayersNumber: req.body.scriptPlayersNumber,
        scriptPlayersNumberDescription: req.body.scriptPlayersNumberDescription,
        scriptDescription: req.body.scriptDescription,
        scriptDuration: req.body.scriptDuration,
    }
    Script.create(script)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        })

};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    Script.findAll({
        attributes: ['scriptName', 'scriptType'],
        }
    )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });


};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const name = req.params.name;
    console.log(req.params.name);
    Script.findAll({
        attributes: ['scriptName', 'scriptType'],
        where: {
            scriptName: name
        }

    })
    .then(data => {
        if(data){
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find script with name`
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: `Some error occurred while retrieving script with name`
            })
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const name = req.params.name;
    console.log(req.params.name);
    Script.destroy({
        where: {
            scriptName: name
        }

    })
        .then(data => {
            if(data){
                res.send('Successfully deleted.');
            } else {
                res.status(404).send({
                    message: `Cannot find script with name ${name}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Some error occurred while retrieving script with name`
            })
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};

exports.getScriptsNumber = (req, res) => {

}
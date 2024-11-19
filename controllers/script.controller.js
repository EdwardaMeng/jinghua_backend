const db = require("../models");
const {QueryTypes} = require("sequelize");
const Script = db.scripts;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = async (req, res) => {
    const script = {
        scriptName: req.body.scriptName,
        scriptPrice: req.body.scriptPrice,
        scriptType: req.body.scriptType,
        scriptPlayersNumber: req.body.scriptPlayersNumber,
        scriptPlayersNumberDescription: req.body.scriptPlayersNumberDescription,
        scriptDescription: req.body.scriptDescription,
        scriptDuration: req.body.scriptDuration,
        scriptImage: req.body.scriptImage,
    }
    await Script.findAll({
        attributes: ['scriptName'],
        where: {scriptName: req.body.scriptName}
    })
        .then((result) => {
            // console.log(script.scriptName);
            // console.log(result);
            if (result.length !== 0) {
                res.send({message: '已经有相同名字的剧本了'});
            } else {
                Script.create(script)
                    .then(data => {
                        // console.log(data);
                        res.send({message: "上传成功"});
                    })
                    .catch(err => {
                        console.log(err);
                        res.send(err.message);
                    })
            }
        })
};

exports.findAll = async (req, res) => {
    await Script.findAll({
        attributes: ['scriptName', 'scriptType', 'scriptPlayersNumber', 'scriptPlayersNumberDescription', 'scriptDescription', 'scriptDuration', 'scriptPrice', 'scriptImage'],
        }
    )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                err
            });
            console.log(err)
        });


};

exports.findScript = async (req, res) => {
    const name = req.params.name;
    await Script.findAll({
        attributes: ['scriptName', 'scriptType', 'scriptPlayersNumber', 'scriptPlayersNumberDescription', 'scriptDescription', 'scriptDuration', 'scriptPrice', 'scriptImage'],
        where: {
            scriptName: {
                [Op.like]: `%${name}%`
            }
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
                err
            })
        });
};

exports.update = async (req, res) => {
    await Script.findAll({
        attributes: ['scriptName'],
        where: {scriptName: req.body.scriptName}
    })
        .then((result) => {
            if(result.length !== 0 && result[0].scriptName !== req.body.oldName) {
                res.send({success: false, message: '已经有相同名字的剧本了'} );
            }
            else {
                sequelize.query(
                    'update scripts ' +
                    `set scriptName = "${req.body.scriptName}", ` +
                    `scriptType = "${req.body.scriptType}", ` +
                    `scriptPlayersNumber = "${req.body.scriptPlayersNumber}", ` +
                    `scriptPlayersNumberDescription = "${req.body.scriptPlayersNumberDescription}", ` +
                    `scriptDescription = "${req.body.scriptDescription}", ` +
                    `scriptDuration = "${req.body.scriptDuration}", ` +
                    `scriptPrice = "${req.body.scriptPrice}", ` +
                    `scriptImage = "${req.body.scriptImage}" ` +
                    `where scriptName = "${req.body.oldName}" `,

                    {
                        type: QueryTypes.UPDATE
                    }
                ).then(r => {
                    res.send({success: true, message: '编辑成功'})
                })
                    .catch(err => {
                        console.log(err);
                        res.send(err)
                    })
            }
        })


};

exports.delete = async (req, res) => {
    const name = req.params.name;
    await Script.destroy({
        where: {
            scriptName: name
        }
    })
        .then(data => {
            if(data){
                res.send({success: true, message: '删除成功'});
            } else {
                res.status(404).send({
                    success: false,
                    message: `Cannot find script with name ${name}`
                });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: `Some error occurred while retrieving script with name`
            })
        });
};

exports.findScriptByPlayersNumber = async (req, res) => {
    console.log(req.params);
    await Script.findAll({
        attributes: ['scriptName', 'scriptType', 'scriptPlayersNumber', 'scriptPlayersNumberDescription', 'scriptDescription', 'scriptDuration', 'scriptPrice', 'scriptImage'],
        where: { scriptPlayersNumber: req.params.playersNumber }
    })
        .then(data => {
            if(data){
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send(err)
            console.log(err)
        })

}

exports.findScriptByType = async (req, res) => {
    await Script.findAll({
        attributes: ['scriptName', 'scriptType', 'scriptPlayersNumber', 'scriptPlayersNumberDescription', 'scriptDescription', 'scriptDuration', 'scriptPrice', 'scriptImage'],
        where: {scriptType: {[Op.like]: `%${req.params.type}%`}}
    })
        .then(data => {
            if(data){
                res.send(data);
            }
        })
        .catch((err) => {
            res.status(500).send(err)
            console.log(err)
        })

}

exports.findScriptByTypeAndPlayersNumber = async (req, res) => {
    await Script.findAll({
        attributes: ['scriptName', 'scriptType', 'scriptPlayersNumber', 'scriptPlayersNumberDescription', 'scriptDescription', 'scriptDuration', 'scriptPrice', 'scriptImage'],
        where: {
            scriptType: {[Op.like]: `%${req.params.type}%`},
            scriptPlayersNumber: req.params.number
        }
    })
        .then(data => {
            if(data){
                res.send(data);
            }
        })
        .catch((err) => {
            res.status(500).send(err)
            console.log(err)
        })

}
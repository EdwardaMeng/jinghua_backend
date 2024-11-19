const db = require("../models");
const {QueryTypes} = require("sequelize");
const sequelize = db.sequelize;
const DM = db.dms

exports.getAllDm = async (req, res) => {
    await DM.findAll({
        attributes: ['name', 'type'],
    })
        .then(data => {
            if(data){
                res.status(200).send(data);
            }
            else{
                res.status(404).send(data);
            }
        })
        .catch(err => {
            res.status(500).send(err)
            console.log(err)
        })
}

exports.createDm = async (req, res) => {
    await DM.findAll({
        attributes: ['name', 'type'],
        where: {
            name: req.body.name,
        }
    })
    .then(data => {
        console.log(data);
        if(data.length === 0){
            DM.create({
                name: req.body.name,
                type: req.body.type,
            })
                .then(data => {
                    if(data){
                        res.send({success: true, message: '增加成功'});
                    }
                    else{
                        res.status(404).send(data);
                    }
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        }
        else{
            res.send({success: false, message: '已经有相同名字的DM了'})
        }
    })
        .catch(err => {
            res.status(500).send({err})
        })
}

exports.updateDm = async (req, res) => {
    await DM.findAll({
        attributes: ['name', 'type'],
        where: {name: req.body.name},
    })
        .then(async data => {
            if (data.length !== 0 && data[0].name !== req.body.oldName) {
                res.send({success: false, message: '已经有相同名字的DM了'})
            } else {
                await sequelize.query(
                        'update dms ' +
                                `set name = "${req.body.name}", ` +
                            `type = "${req.body.type}" ` +
                            `where name = "${req.body.oldName}"`,
                    {
                        type: QueryTypes.UPDATE,
                    }

                )
                    .then(data => {
                        if(data){
                            res.send({success: true, message: '修改成功'});
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        .catch(err => {
            res.status(500).send({err})
        })
}

exports.deleteDm = async (req, res) => {
    console.log(req.params)
    await DM.destroy({
        where: {
            name: req.params.name,
        }
    })
    .then(data => {
        if(data){
            res.send({success: true, message: '删除成功'})
        }
    })
        .catch(err => {
            res.status(500).send(err)
            console.log(err)
        })
}
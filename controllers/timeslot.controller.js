const db = require("../models");
const {QueryTypes} = require("sequelize");
const Timeslot = db.timeslots;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.getAllTimeslotsByName = async (req, res) => {
    await Timeslot.findAll({
        attributes: ['period'],
        where: {
            dm: req.params.name,
        }
    })
        .then(data => {
            // console.log(data)
            if(data.length > 0){
                res.send(data)
            }
            else{
                res.send({message: '该DM还没有上传日期'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
}

exports.getAllAvailableTimeslotsByName = async (req, res) => {
    await Timeslot.findAll({
        attributes: ['period'],
        where: {
            isReserved: false,
            dm: req.params.name,
        }
    })
        .then(data => {
            // console.log(data)
            if(data.length > 0){
                res.send(data)
            }
            else{
                res.send({message: '该DM还没有上传日期'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
}

exports.reserveTimeslot = async (req, res) => {
    await sequelize.query(
        "update timeslots " +
        "set isReserved = true " +
        `WHERE period = '${req.body.timeslot}' AND dm = '${req.body.dm}'`,
    )
        .then(data => {
            if(data){
                res.send({success: true, message: "预约成功"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
}

exports.uploadTimeslot = async (req, res) => {
    await Timeslot.create({
        period: req.body.period,
        dm: req.body.dm,
        isReserved: false
    })
        .then(data => {
            if(data){
                res.send({success: true, message: '上传成功'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
            }
        )
}

exports.deleteTimeslot = async (req, res) => {
    await Timeslot.destroy({
        where: {
            period: req.params.period,
            dm: req.params.dm
        }
    })
        .then(data => {
            if(data){
                res.send({success: true, message: '删除成功'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}
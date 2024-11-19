const db = require("../models");
const {QueryTypes} = require("sequelize");
const Reservation = db.reservation;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.createReservation = async (req, res) => {
    await Reservation.create({
        dm: req.body.dm,
        timeslot: req.body.timeslot,
        wechat: req.body.wechat,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        script: req.body.script,
        userName: req.body.userName
    })
        .then(result => {
            res.send({success: true, message: "预约成功"});
        })
        .catch(err => {
            console.log(err);
            res.send(err.message);
        })
}

exports.getAllReservations = async (req, res) => {
    await Reservation.findAll({
        attributes: ['timeslot', 'wechat', 'phoneNumber', 'email', 'dm', 'userName', 'script'],
    })
        .then(data => {
            if (data && data.length > 0) {
                res.send(data)
            }
        })
        .catch(err => {
            console.log(err);
            res.send(err.message);
        })
}
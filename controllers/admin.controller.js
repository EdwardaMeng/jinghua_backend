const db = require("../models");
const {QueryTypes} = require("sequelize");
const Admin = db.admins
const sequelize = db.sequelize;

exports.login = async (req, res) => {
    await Admin.findAll({
        attributes: ['account'],
        where: {
            account: req.body.account,
            password: req.body.password
        }
    })
    .then(data => {
        if(data){
            res.status(200).send(data);
        }
        else{
            res.status(404).send(data);
        }
    })
}
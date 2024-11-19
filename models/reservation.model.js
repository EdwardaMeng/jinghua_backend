module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "reservation", {
            timeslot: {
                type: Sequelize.STRING,
            },
            dm: {
                type: Sequelize.STRING,
            },
            wechat: {
                type: Sequelize.STRING,
            },
            phoneNumber: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            script: {
                type: Sequelize.STRING,
            },
            userName: {
                type: Sequelize.STRING
            }
        },
        {
            timestamps: false,
        });
};
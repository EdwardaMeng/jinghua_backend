module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "timeslots", {
            period: {
                type: Sequelize.STRING,
            },
            dm: {
                type: Sequelize.STRING,
            },
            isReserved: {
                type: Sequelize.BOOLEAN,
            }
        },
        {
            timestamps: false,
        });
};
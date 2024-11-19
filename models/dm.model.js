module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "dm", {
            name: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            }
        },
        {
            timestamps: false,
        });
};
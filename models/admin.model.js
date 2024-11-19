module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "admin", {
            account: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            }
        },
        {
            timestamps: false,
        });
};
module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "script", {
            scriptDescription: {
                type: Sequelize.TEXT
            },
            scriptName: {
                type: Sequelize.STRING
            },
            scriptType: {
                type: Sequelize.STRING
            },
            scriptPlayersNumber: {
                type: Sequelize.INTEGER
            },
            scriptPlayersNumberDescription: {
                type: Sequelize.STRING
            },
            scriptPrice: {
                type: Sequelize.INTEGER
            },
            scriptDuration: {
                type: Sequelize.STRING
            },
            scriptImage: {
                type: Sequelize.STRING
            }
        },
        {
            timestamps: false,
        });
};


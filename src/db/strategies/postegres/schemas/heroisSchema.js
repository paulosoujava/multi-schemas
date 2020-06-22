const Sequelize = require('sequelize')

const HeroSchema = {
    tableName: 'herois',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            require: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            require: true,
        },
        poder: {
            type: Sequelize.STRING,
            require: true,
        }
    },
    options: {
        tableNae: 'DB_HEROIS',
        freezeTableName: false,
        timestamps: false

    }
}
module.exports = HeroSchema
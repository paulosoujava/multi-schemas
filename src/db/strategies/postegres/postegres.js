const Sequelize = require("sequelize")
const ICrud = require('./../interfaces/interfaceCrud')
const { connection } = require("mongoose")

class Postegres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }
    async create(item) {
        const { dataValues } = await this._schema.create(item)
        return dataValues
    }

    async read(item = {}) {
        return await this._schema.findAll({
            where: item,
            raw: true,

        })
    }

    async update(id, item) {
        return this._schema.update(item, { where: { id }, returning: true, raw: true })
    }

    async delete(id) {
        const query = id ? { id } : {}
        return this._schema.destroy({ where: query })
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options
        )
        await model.sync()
        return model
    }

    static async connect() {
        const connection = new Sequelize(
            'heroes',
            'paulo',
            'root', {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false,
                logging: false
            }
        )
        return connection
    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true
        } catch (erro) {
            console.log('fail ' + erro)
            return false

        }
    }
}

module.exports = Postegres
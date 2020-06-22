const ICrud = require('./../interfaces/interfaceCrud')
const Mongoose = require("mongoose")

const STATUS = {
    0: 'Discontadado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Discontadando',
}
class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this.schema = schema
        this.connection = connection
    }

    async isConnected() {
        const state = STATUS[this.connection.readyState]
        if (state === 'Conectado') return state
        if (state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this.connection.readyState]


    }

    static connect() {
        Mongoose.connect('mongodb://paulo:root@localhost:27017/herois', {
            useNewUrlParser: true
        }, function(error) {
            if (!error) return;
            console.log('Falha na conexão', error);
        })

        return Mongoose.connection

    }

    async create(item) {
        return this.schema.create(item)
    }

    async read(item, skip = 0, limit = 10) {
        return this.schema.find(item).skip(skip).limit(limit)
    }
    async update(id, item) {
        return this.schema.updateOne({ _id: id }, { $set: item })
    }
    async delete(id) {
        return this.schema.deleteOne({ _id: id })
    }


}

module.exports = MongoDB
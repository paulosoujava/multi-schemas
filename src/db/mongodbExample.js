const Mongoose = require("mongoose")

Mongoose.connect('mongodb://paulo:root@localhost:27017/herois', {
    useNewUrlParser: true
}, function(error) {
    if (!error) return;
    console.log('Falha na conexão', error);
})

const connection = Mongoose.connection
connection.once('open', () => console.log('database rodando'))
    //const state = connection.readyState
    // 0 -> disconectado
    // 1 -> conectado
    // 2 -> conectaNdo
    // 3 -> disconectado
    //console.log('state:: ' + state);

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('herois', heroiSchema)
async function main() {
    const resultCadastrar = await model.create({
        nome: 'Bataman',
        poder: 'Dinheiro'
    })

    console.log('result cadastrar', resultCadastrar);

    const listItems = await model.find()
    console.log('items', listItems);

}

main()
const assert = require("assert")
const Context = require('./../db/strategies/base/contextStrategy')
const Mongodb = require("./../db/strategies/mongodb/mongodb")
const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroisSchema')

const MOCK_HEROI = {
    nome: 'PAULO',
    poder: 'pobreza'
}
const MOCK_HEROI_ATUALIZAR = {
    nome: 'PATOLINO',
    poder: 'CHATO'
}
let MOCK_HEROI_ID = ''

let context = {}

describe('MongoDB suite de testes', function() {
    this.beforeAll(async() => {
        const connection = Mongodb.connect()
        context = new Context(new Mongodb(connection, HeroiSchema))

        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
    })
    it('verificar  conexão', async() => {
        const result = await context.isConnected()
        const expected = 'Conectado'
        assert.deepEqual(result, expected)
    })
    it('cadastrar', async() => {
        const { nome, poder } = await context.create(MOCK_HEROI)
        assert.deepEqual({ nome, poder }, MOCK_HEROI)
    })
    it('listar', async() => {
        //const results = await context.read({ nome: MOCK_HEROI.nome }, 0, 2)
        //console.log(results);
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI.nome })
        const result = {
            nome,
            poder
        }
        assert.deepEqual(result, MOCK_HEROI)
    })
    it('atualizar', async() => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalong'
        })
        assert.deepEqual(result.nModified, 1)
    })
    it('remover', async() => {
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepEqual(result.n, 1)
    })
})
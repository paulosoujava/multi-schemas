const assert = require("assert")
const Context = require('./../db/strategies/base/contextStrategy')
const Postegres = require("./../db/strategies/postegres/postegres")
const HeroiSchema = require("./../db/strategies/postegres/schemas/heroisSchema")


const MOCK_HEROIS = {
    nome: 'Gavião Negro',
    poder: 'flexa'
}
let context = {}
describe('Postegres Strategy', function() {
    this.timeout(Infinity)
    this.beforeAll(async function() {
        const connection = await Postegres.connect()
        const model = await Postegres.defineModel(connection, HeroiSchema)
        context = new Context(new Postegres(connection, model))
        await context.delete()
            //criar para atualiza
        await context.create(MOCK_HEROIS)
    })
    it('PostSQL Connection', async function() {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it('cadastrar', async function() {
        const result = await context.create(MOCK_HEROIS)
        delete result.id
        assert.deepEqual(result, MOCK_HEROIS)
    })
    it('listar', async function() {
        const [result] = await context.read({ nome: MOCK_HEROIS.nome })
        delete result.id
        assert.deepEqual(result, MOCK_HEROIS)
    })
    it('atualizar', async function() {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROIS.nome })
        const novoItem = {
            ...MOCK_HEROIS,
            nome: 'PAULO OLIVEIRA'
        }
        const [qtd, [result]] = await context.update(itemAtualizar.id, novoItem);
        assert.deepEqual(result.nome, novoItem.nome);
    })
    it('remover por id', async function() {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
})
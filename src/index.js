const ContextStrategy = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb')
const Postegres = require('./db/strategies/postegres')

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()

const contextPostegres = new ContextStrategy(new Postegres())
contextPostegres.create()
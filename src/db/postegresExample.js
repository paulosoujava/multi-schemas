//npm install sequelize pg-hstore pg

const Sequelize = require("sequelize")

const driver = new Sequelize(
    'heroes',
    'paulo',
    'root', {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false,
    }
)

async function main() {
    const Herois = driver.define('herois', {
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
    }, {
        tableName: 'DB_HEROIS',
        freezeTableName: false,
        timestamps: false
    })

    await Herois.sync()
        // await Herois.create({
        //     nome: 'Lanterna Verde',
        //     poder: 'Anel'
        // })

    const MOCK_HEROIS = {
        nome: 'Gavião Negro',
        poder: 'flexa'
    }

    const item = { nome: MOCK_HEROIS.nome }
    const result = await Herois.findAll({
        where: item,
        raw: true,

    })
    console.log('result', result);

}

main()
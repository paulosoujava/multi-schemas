//docker ps
//docker exec -it 84852edc34cf  mongo -u paulo -p --authenticationDatabase herois
``
` 
//databases
show dbs
//mudando o contexto para uma db especifica
use herois
//mostrando as colecoes de documentos
show collections

db.herois.insert({
  nome: 'Flash',
  poder: 'Velocidade',
  dataNascimento : '1982-01-28
})

db.herois.find()
db.herois.find().pretty()

for (let i = 0; i < 100; i++) {
  db.herois.insert({
      nome: `
Flash - $ { i }
`,
      poder: 'Velocidade',
      dataNascimento: '1982-01-28'
  })
}
db.findOne()
db.count()
db.herois.find().limit(20).sort({nome:-1})
db.herois.find({},{poder:1, _id:0})

//create
 db.herois.insert({
  nome: 'Flash',
  poder: 'Velocidade',
  dataNascimento : '1982-01-28
})

//read
db.herois.find()

//update
//atualiza os dados e destroi os outros
db.herois.update({
  _id:  ObjectId("5ef0f1ed3c9c5ace619c7ca1")
},{nome: 'Mulher'})

//atualizar somente UM DADO E MANTER OS OUTROS
db.herois.update({
  _id:  ObjectId("5ef0f1ed3c9c5ace619c7ca1")
},{$set: {nome: 'Lanterna Verde'} })

//remove TODOS
db.herois.remove({})

db.herois.remove({where: id})

`
``
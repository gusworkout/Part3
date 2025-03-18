const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const nameArg = process.argv[3]
const numberArg = process.argv[4]

const url =
  `mongodb+srv://tavoaod:${password}@cluster0.8esnq.mongodb.net/agendPhone?
    retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

//Muestra como se guardan los datos en mongo y cuales se guardaran
const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', PersonSchema)


if (!nameArg || !numberArg) {
  Person.find({}).then(result => {
    result.forEach(persons => {
      console.log(persons.name, persons.number)
    })
    mongoose.connection.close()
  })
} else {

  //MODELO DE LOS DATOS
  const persons = new Person({
    name: nameArg,
    number: numberArg,
  })
  
  //CREA UNA NUEVA NOTA CON EL MODELO Person ########
  persons.save().then(result => {
    console.log(`added ${nameArg} number ${numberArg} to phonebook`)
    mongoose.connection.close()
  })

}


/*
HACER UNA BUSQUEDA ESPCIFICA
Person.find({name: 'Anna Frank'}).then(persons => {
  result.forEach(persons => {
    console.log(persons)
  })
  mongoose.connection.close()

})
*/
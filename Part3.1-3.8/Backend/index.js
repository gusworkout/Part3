require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')


const Person = require('./models/note')

app.use(express.static('dist'))
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())


app.get('/info', (request, response) =>{
  const numOfpersons = Person.length
  const today = new Date(8.64e15).toString()

  response.send(
    `Phone has info for ${numOfpersons} people 
    <p></p> 
     ${today} `
  )
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
      response.json(persons)
  })
  
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(persons => {
      if (persons) {
        response.json(persons)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const persons = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, persons, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const persons = new Person({
    name: body.name,
    number: body.number,
    important: body.important || false,
  })

  persons.save().then(savedPerson => {
    response.json(savedPerson)
  })
})



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
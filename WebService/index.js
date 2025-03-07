const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(morgan('tiny'))

app.use(express.json())

let persons = [
    { 
      id: 1,
      name: "Artos Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Marys Poppendieck", 
      number: "39-23-6423122"
    }
]




app.get('/info', (request, response) =>{
  const numOfpersons = persons.length
  const today = new Date(8.64e15).toString()

  response.send(
    `Phone has info for ${numOfpersons} people 
    <p></p> 
     ${today} `
  )
})

app.get('/api/persons', (request, response) =>{
  response.send(persons)
})

app.get('/api/persons/:id', (request, response) =>{
    const id = Number(request.params.id)
    const person = persons.find(person=> person.id === id)

    if (person) {
      response.json(person)
    }else{
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) =>{
  const id = Number(request.params.id)
  const person = persons.filter(person => person.id !== id)
  response.json(person)
  response.status(204).end()
})

const generateId =()=>{
  const maxId = persons.length > 0
? Math.max(...persons.map(n => n.id)):0

return maxId + 1


}

app.post('/api/persons', (request, response) =>{
  console.log("Body recibido:", request.body);
  const body = request.body

  if (!body.name || !body.number){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id:generateId(),
  }

  persons= persons.concat(person)

  response.json(person)

})


const PORT = 3002
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})


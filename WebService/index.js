const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(morgan('tiny'))

app.use(express.json())

let notes = [
    { 
      id: 1,
      name: "Arto Hellas", 
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
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]




app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/notes/:id', (request, response) =>{
    const id = Number(request.params.id)
    const note = notes.find(note=> note.id === id)

    if (note) {
      response.json(note)
    }else{
      response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) =>{
  const id = Number(request.params.id)
  const note = notes.filter(note = note.id !== id)

  response.status(204).end()
})

const generateId =()=>{
  const maxId = notes.length > 0
? Math.max(...notes.map(n => n.id))
:0

const note=request.body
note.id = maxId + 1

notes= notes.concat(note)

}

app.post('/api/notes', (request, response) =>{
  const body = request.body
  if (!body.content){
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const note = {
    content: body.content,
    important: Boolean(body.important)|| false,
    id:generateId(),
  }
  notes= notes.concat(note)

  response.json(note)

})


const PORT = 3002
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})


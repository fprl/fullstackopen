require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

const noteContent = process.argv[2]

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


// Schemas
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

// Model
const Note = mongoose.model('Note', noteSchema)

const createNote = () => {
  const note = new Note({
    content: noteContent,
    date: new Date(),
    important: true,
  })

  note.save()
    .then(savedNote => {
      console.log('note saved:', savedNote)
      mongoose.connection.close()
    })
    .catch(err => console.log(err))
}

const getNotes = () => {
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 2) {
  getNotes()
}

if (process.argv.length === 3) {
  createNote()
}

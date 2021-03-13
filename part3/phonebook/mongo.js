require('dotenv').config()
const mongoose = require('mongoose')
const { Schema } = mongoose

const url = process.env.MONGODB_URI
const firstName = process.argv[2]
const phoneNumber = Number(process.argv[3])

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB', error.message))

// Schemas
const personSchema = new Schema({
  firstName: String,
  phoneNumber: Number,
})

// Model
const Person = mongoose.model('Person', personSchema)


// Functions
const getPersons = () => {
  Person.find({})
    .then(result => {
      console.log('phonebook:')
      result.forEach(person => {
        console.log(person.firstName, person.phoneNumber)
      })
      mongoose.connection.close()
    })

}

const createPerson = () => {
  const person = new Person({
    firstName: firstName,
    phoneNumber: phoneNumber
  })

  person
    .save().then(result => {
      console.log(result)
      console.log(`added ${firstName} number ${phoneNumber} to phonebook`)
      mongoose.connection.close()
    })
    .catch(error => console.log(error))
}

if (process.argv.length === 2) {
  getPersons()
}

if (process.argv.length === 4) {
  createPerson()
}

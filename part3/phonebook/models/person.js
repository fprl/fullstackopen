const mongoose = require('mongoose')
const { Schema } = mongoose
var uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB', error.message))


// Schemas
const personSchema = new Schema({
  firstName: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  phoneNumber: {
    type: Number,
    validate: {
      validator: val => val.toString().length >= 8,
      message: props => `Phone number must have at least 8 digits, you entered ${props.value} which only has ${props.value.toString().length} digits`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator)

// Model
module.exports = mongoose.model('Person', personSchema)

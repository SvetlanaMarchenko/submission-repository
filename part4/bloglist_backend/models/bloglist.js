

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url)

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const bloglistSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3],
    required: true
  },

  number: {
    type: String,
    validate: {
      validator: function (value) {
        return /^\d{2,3}-\d{7,8}$/.test(value);
      },
      message: 'Invalid phone number format, should be XX-XXXXXXXX or XXX-XXXXXXXX.'
    },
    required: true
  }
})


bloglistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Bloglist', bloglistSchema)
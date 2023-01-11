const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

// const url = `mongodb+srv://fullstack:${password}@cluster0.vrqq1yf.mongodb.net/noteApp?retryWrites=true&w=majority`
const url = `mongodb://phonebook:2XaxKgEMikA4nwcb@ac-9qpagj5-shard-00-00.bpzfary.mongodb.net:27017,ac-9qpagj5-shard-00-01.bpzfary.mongodb.net:27017,ac-9qpagj5-shard-00-02.bpzfary.mongodb.net:27017/?ssl=true&replicaSet=atlas-mv4uqt-shard-0&authSource=admin&retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const note = new Note({
      content: 'Callback functions suck',
      date: new Date(),
      important: true,
    })

    // Note.find({}).then(result => {
    //   result.forEach(note => {
    //     console.log(note)
    //   })
    //   mongoose.connection.close()
    // })

    return note.save()
  })
  .then(() => {
    console.log('note saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
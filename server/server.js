const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}))

mongoose.connect('mongodb://127.0.0.1:27017/KeeperDB1');

const noteSchema = {
    title: String,
    content: String
}

const Note = mongoose.model('note', noteSchema)



app.get("/", function(req, res) {
    Note.find({}).then(function(foundItems) {
        res.json(foundItems)
    })
})

app.post("/", function(req, res) {
    let note = new Note()
    note.title = req.body.title;
    note.content = req.body.content;
    const doc = note.save()
    res.json(doc)
})


app.post("/delete", function(req, res) {
    const id = req.body.id
    Note.findByIdAndDelete(id).then(function(item) {

    })

    res.redirect("/")
  
})


app.listen(8080, function() {
    console.log("Server started on port 8080")
})

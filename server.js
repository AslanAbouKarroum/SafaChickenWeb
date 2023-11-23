const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
// const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs')

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

//https://nodejs.org/api/events.html#emitteroneventname-listener
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=>{
    console.log("Connected to MongoDB")
})

// Define a schema and a model for the form data
const contactSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: Number,
    message: String
})

const Contact = mongoose.model('Contact',contactSchema)

// Handle Form Submission Request
app.post('/submit', async(req,res)=>{
    const formData = {
        name: req.body.Name,
        address: req.body.Address,
        phone: req.body.Phone,
        message: req.body.Message
    }
    try{
        const newContact = new Contact(formData)
        await newContact.save()
        res.redirect('/')
    } catch(error) {
        res.redirect('/?error')
    }
})

app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/reservations', (req, res) => {
    db.collection('contacts')
    .find()
    .toArray()
    .then(results => {
      res.render('index.ejs',{messages:results})
    })
    .catch(error => console.error(error))
  })


// Start server
const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server connected on ${PORT}`)
})
const express = require("express");
const fs = require("fs");
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))//For serving static files
const path=require("path");
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')// Set the template engine as pug

// Set the views directory
app.set('views', path.join(__dirname, 'views'))


//EndPoints
app.get('/',(req,res)=>{

    const params = {}
res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{

    const params = {}
res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{

   var myData=new Contact(req.body);
   
   myData.save().then(()=>{
    res.send("The item is saved to database");
   }).catch(()=> {
       res.status(400).send("Item was not saved to the database");
   });
 res.status(200).render('contact.pug');
})
//If we want to save data by using post method by using express then we have to install
//npm install body-parser

//Start the server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

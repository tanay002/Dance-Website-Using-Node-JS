const express = require("express");
const fs = require("fs");
const app = express();
const port = 8000;


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

//Start the server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

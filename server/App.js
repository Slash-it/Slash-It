require('dotenv').config();
const express = require('express');
const app = express()
const router = require('./Router/router.js')
const PORT = process.env.PORT || 3002
const client = require('./Services/config')
const cors = require('cors');
const createUserCollection = require('./Helper/userCollection')

function initializeMongo(req,res,next){
    client.connect()
    .then(()=>{
        const db = client.db('Slash-It');
        createUserCollection(db)
        req.db = db;
        next()
    })
    .catch(err=>{
        res.send(err)
    })
}

app.use(initializeMongo)
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',router)

app.listen(PORT,()=>{
    console.log('listening to port ' + PORT)
})

module.exports = app
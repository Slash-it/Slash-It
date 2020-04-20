const express = require('express');
const app = express()
const router = require('./Router/router.js')
const port = 3002
const client = require('./Services/config')
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
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',router)

app.listen(port,()=>{
    console.log('listening to port ' + port)
})

module.exports = app
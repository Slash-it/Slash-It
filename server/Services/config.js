const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const urlAtlas = `mongodb+srv://admin:${process.env.ATLAS_PASSWORD}@userserver-lfv0u.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(url,{useNewUrlParser: true,useUnifiedTopology:true})

module.exports = client
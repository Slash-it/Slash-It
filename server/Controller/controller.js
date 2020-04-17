const Users = require('../Model/model')

class userController{

    static view(req,res,next){
        Users.find(req.db)
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static add(req,res,next){
        Users.create(req.db,req.body)
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

}

module.exports = userController
class userModel{

    static find(db){
        return db.collection("Users").find().toArray()
    }

    static create(db, newUser){
        return db.collection("Users").insertOne(newUser)
    }
}

module.exports = userModel
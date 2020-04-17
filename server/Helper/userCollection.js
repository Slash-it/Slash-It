function createUserCollection(db){
    db.createCollection( "Users", {
        validator: { $jsonSchema: {
           bsonType: "object",
           required: [ "name" ],
           properties: {
              name: {
                 bsonType: "string",
                 description: "must be a string and is required"
              },
              score: {
                 bsonType : "double",
              }
           }
        } }
     } )
}

module.exports = createUserCollection
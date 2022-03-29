db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "password"],
            properties:{
                username: {
                    bsonType: "string",
                    description: "Not a string!"
                },
                password: {
                    bsonType: "string",
                    description: "Not a string!"
                },
                habit: {
                    bsonType: "array",
                    description: "Not an array!",
                    properties: {
                        habitName: {
                            bsonType: "string",
                            description: "Not an string",
                        },
                        schedule: {
                            bsonType: "string",
                            description: "Not a string!"
                        },
                        completed: {
                            bsonType: "bool",
                            description: "Not a bool!"
                        },
                        dates: {
                            bsonType: [],
                            description: "Not an array"
                        },
                        currentStreak: {
                            bsonType: "int",
                            description: "Not an int!"
                        },
                        longestStreak: {
                            bsonType: "int",
                            description: "Not an int!"
                        }


                    

                    }
                }
            }
        }
    }
})
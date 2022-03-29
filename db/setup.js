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
                    bsonType: "object",
                    description: "Not an object!",
                    required: ["habitName", "schedule", "completed", "dates", "currentStreak", "longestStreak"],
                    properties: {
                        habitName: {
                            bsonType: "string",
                            description: "Not a string!"
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
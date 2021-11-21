const WordsNinjaPack = require("wordsninja");
exports.handler = async (event) => {

    const WordsNinjaPack = require("wordsninja")
    const WordsNinja = new WordsNinjaPack();
    await WordsNinja.loadDictionary();


    var isWord = require('is-word');
    var englishWords = isWord('american-english');


    // I shouldn't do this here. But it's too late to pre process all the results!!!
    async function isPersonalOrGeneric(email) {

        let e_username = email.split('@')[0]

        let email_segs = WordsNinja.splitSentence(e_username)
        // console.log(email_segs)

        // const proper_words = []
        // for (let i = 0; i < proper_words.length; i++) {
        //     if (email_segs.includes(proper_words[i].toLowerCase())) {
        //         return "personal";
        //     }
        // }

        // split up word into words
        // check if it contains any words that are also proper nouns (hunt, hall, ...). remove those words
        // check if any words in the email are real words. those are generic emails
        // any other emails are personal


        const names = {
            'first': ['Olivia', 'Emma', 'Ava', 'Charlotte', 'Sophia', 'Amelia', 'Isabella', 'Mia', 'Evelyn', 'Harper', 'Camila', 'Gianna', 'Abigail', 'Luna', 'Ella', 'Elizabeth', 'Sofia', 'Emily', 'Avery', 'Mila', 'Scarlett', 'Eleanor', 'Madison', 'Layla', 'Penelope', 'Aria', 'Chloe', 'Grace', 'Ellie', 'Nora', 'Hazel', 'Zoey', 'Riley', 'Victoria', 'Lily', 'Aurora', 'Violet', 'Nova', 'Hannah', 'Emilia', 'Zoe', 'Stella', 'Everly', 'Isla', 'Leah', 'Lillian', 'Addison', 'Willow', 'Lucy', 'Paisley', 'Natalie', 'Naomi', 'Eliana', 'Brooklyn', 'Elena', 'Aubrey', 'Claire', 'Ivy', 'Kinsley', 'Audrey', 'Maya', 'Genesis', 'Skylar', 'Bella', 'Aaliyah', 'Madelyn', 'Savannah', 'Anna', 'Delilah', 'Serenity', 'Caroline', 'Kennedy', 'Valentina', 'Ruby', 'Sophie', 'Alice', 'Gabriella', 'Sadie', 'Ariana', 'Allison', 'Hailey', 'Autumn', 'Nevaeh', 'Natalia', 'Quinn', 'Josephine', 'Sarah', 'Cora', 'Emery', 'Samantha', 'Piper', 'Leilani', 'Eva', 'Everleigh', 'Madeline', 'Lydia', 'Jade', 'Peyton', 'Brielle', 'Adeline', 'Liam', 'Noah', 'Oliver', 'Elijah', 'William', 'James', 'Benjamin', 'Lucas', 'Henry', 'Alexander', 'Mason', 'Michael', 'Ethan', 'Daniel', 'Jacob', 'Logan', 'Jackson', 'Levi', 'Sebastian', 'Mateo', 'Jack', 'Owen', 'Theodore', 'Aiden', 'Samuel', 'Joseph', 'John', 'David', 'Wyatt', 'Matthew', 'Luke', 'Asher', 'Carter', 'Julian', 'Grayson', 'Leo', 'Jayden', 'Gabriel', 'Isaac', 'Lincoln', 'Anthony', 'Hudson', 'Dylan', 'Ezra', 'Thomas', 'Charles', 'Christopher', 'Jaxon', 'Maverick', 'Josiah', 'Isaiah', 'Andrew', 'Elias', 'Joshua', 'Nathan', 'Caleb', 'Ryan', 'Adrian', 'Miles', 'Eli', 'Nolan', 'Christian', 'Aaron', 'Cameron', 'Ezekiel', 'Colton', 'Luca', 'Landon', 'Hunter', 'Jonathan', 'Santiago', 'Axel', 'Easton', 'Cooper', 'Jeremiah', 'Angel', 'Roman', 'Connor', 'Jameson', 'Robert', 'Greyson', 'Jordan', 'Ian', 'Carson', 'Jaxson', 'Leonardo', 'Nicholas', 'Dominic', 'Austin', 'Everett', 'Brooks', 'Xavier', 'Kai', 'Jose', 'Parker', 'Adam', 'Jace', 'Wesley', 'Kayden', 'Silas'],
            'last': ['SMITH', 'JOHNSON', 'WILLIAMS', 'BROWN', 'JONES', 'GARCIA', 'MILLER', 'DAVIS', 'RODRIGUEZ', 'MARTINEZ', 'HERNANDEZ', 'LOPEZ', 'GONZALEZ', 'WILSON', 'ANDERSON', 'THOMAS', 'TAYLOR', 'MOORE', 'JACKSON', 'MARTIN', 'LEE', 'PEREZ', 'THOMPSON', 'WHITE', 'HARRIS', 'SANCHEZ', 'CLARK', 'RAMIREZ', 'LEWIS', 'ROBINSON', 'WALKER', 'YOUNG', 'ALLEN', 'WRIGHT', 'SCOTT', 'TORRES', 'NGUYEN', 'FLORES', 'ADAMS', 'NELSON', 'BAKER', 'RIVERA', 'CAMPBELL', 'MITCHELL', 'CARTER', 'ROBERTS', 'GOMEZ', 'PHILLIPS', 'EVANS', 'TURNER', 'DIAZ', 'PARKER', 'CRUZ', 'EDWARDS', 'COLLINS', 'REYES', 'STEWART', 'MORRIS', 'MORALES', 'MURPHY', 'COOK', 'ROGERS', 'GUTIERREZ', 'ORTIZ', 'MORGAN', 'COOPER', 'PETERSON', 'BAILEY', 'REED', 'KELLY', 'HOWARD', 'RAMOS', 'KIM', 'COX', 'WARD', 'RICHARDSON', 'WATSON', 'BROOKS', 'CHAVEZ', 'WOOD', 'JAMES', 'BENNETT', 'GRAY', 'MENDOZA', 'RUIZ', 'HUGHES', 'PRICE', 'ALVAREZ', 'CASTILLO', 'SANDERS', 'PATEL', 'MYERS', 'LONG', 'ROSS', 'FOSTER', 'JIMENEZ', 'POWELL', 'JENKINS', 'PERRY', 'RUSSELL', 'SULLIVAN', 'BELL', 'COLEMAN', 'BUTLER', 'HENDERSON', 'BARNES', 'GONZALES', 'FISHER', 'VASQUEZ', 'SIMMONS', 'ROMERO', 'JORDAN', 'PATTERSON', 'ALEXANDER', 'HAMILTON', 'GRAHAM', 'REYNOLDS', 'GRIFFIN', 'WALLACE', 'MORENO', 'COLE', 'HAYES', 'BRYANT', 'HERRERA', 'GIBSON', 'ELLIS', 'TRAN', 'MEDINA', 'AGUILAR', 'STEVENS', 'MURRAY', 'FORD', 'CASTRO', 'MARSHALL', 'OWENS', 'HARRISON', 'FERNANDEZ', 'MCDONALD', 'WOODS', 'WASHINGTON', 'KENNEDY', 'WELLS', 'VARGAS', 'HENRY', 'CHEN', 'FREEMAN', 'WEBB', 'TUCKER', 'GUZMAN', 'BURNS', 'CRAWFORD', 'OLSON', 'SIMPSON', 'PORTER', 'HUNTER', 'GORDON', 'MENDEZ', 'SILVA', 'SHAW', 'SNYDER', 'MASON', 'DIXON', 'MUNOZ', 'HUNT', 'HICKS', 'HOLMES', 'PALMER', 'WAGNER', 'BLACK', 'ROBERTSON', 'BOYD', 'ROSE', 'STONE', 'SALAZAR', 'FOX', 'WARREN', 'MILLS', 'MEYER', 'RICE', 'SCHMIDT', 'GARZA', 'DANIELS', 'FERGUSON', 'NICHOLS', 'STEPHENS', 'SOTO', 'WEAVER', 'RYAN', 'GARDNER', 'PAYNE', 'GRANT', 'DUNN', 'KELLEY', 'SPENCER', 'HAWKINS'],
        };

        for (let i = 0; i < names.first.length; i++) {
            if (email_segs.includes(names.first[i].toLowerCase())) {
                return "personal";
            }
        }
        for (let i = 0; i < names.last.length; i++) {
            if (email_segs.includes(names.last[i].toLowerCase())) {
                return "personal"
            }
        }

        for (let i = 0; i < email_segs.length; i++) {
            if(englishWords.check(email_segs[i])){
                console.log("nice!")
                return "generic"
            }
        }

        return "none"
    }

    const {domain = ""} = event.queryStringParameters;
    // const {n_results = 10} = event.queryStringParameters;  // number of results to be returned

    const isValidDomain = require('is-valid-domain');

    // validate domain
    if (!isValidDomain(domain)) {
        // domain is invalid
        return {
            statusCode: 500,
            body: JSON.stringify(
                {
                    "message": "Domain is invalid",
                    "results": []
                }
            )
        }
    }

    // if valid, query data base and return data in the form of: (rearrange data in this script if neccessary), only return top n

    const {MongoClient} = require("mongodb");
    const uri = "mongodb+srv://gatherer:bertha123@cluster0.iuyhs.mongodb.net/gatherer?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    try {
        await client.connect();
        const dbo = client.db("gatherer")
        const emails = dbo.collection("email");
        console.log("Connected successfully to server");
        console.log(domain)
        const options = {
            projection: {_id: 0, email: 1},
        };
        const out = await emails.find({email_domain: domain}, options)

        let arr = []
        await out.forEach(el => {
            arr.push(el.email.toLowerCase()) // this needs to go to lower case because they're not lc in the db
        })

        // if domain can't be found in the db
        if (arr.length == 0) {
            return {
                statusCode: 500,
                body: JSON.stringify(
                    {
                        "message": "No emails were found for this domain",
                        "results": []
                    }
                )
            }
        }


        // sorting bs. this is awful copy and paste code. don't judge pls
        const count = {};

        for (const element of arr) {
            if (count[element]) {
                count[element] += 1;
            } else {
                count[element] = 1;
            }
        }

        var sortable = [];
        for (var el in count) {
            sortable.push([el, count[el]]);
        }

        sortable.sort(function (a, b) {
            return a[1] - b[1];
        });

        // TODO: can we verify here that they're valid emails!

        let results = []

        let leng
        if (sortable.length > 500) {
            leng = 500;
        } else {
            leng = sortable.length
        }

        for (var i = 0; i < leng; i++) {
            results.push(
                {
                    "email": sortable[sortable.length - i - 1][0],
                    "n_appearances": sortable[sortable.length - i - 1][1],
                    "type": await isPersonalOrGeneric(sortable[sortable.length - i - 1][0])
                }
            )
        }

        await client.close();

        return {
            statusCode: 200,
            body: JSON.stringify({
                    "message": "",
                    "results": results
                }
            )
        }


    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }


    // {
    //     "message": "None"
    //     "results": [
    //         {
    //             "email": "email@email.com",
    //             "n_appearances": "10"
    //         },
    //         {
    //             "email": "email@email.com",
    //             "n_appearances": "10"
    //         }
    //     ]
    // }


    // if valid
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify({
    //             "message": "null",
    //             "results": [
    //                 {
    //                     "email": "email@email.com",
    //                     "n_appearences": "10"
    //                 },
    //                 {
    //                     "email": "email@email.com",
    //                     "n_appearences": "10"
    //                 }
    //             ]
    //         }
    //     )
    // }

    // if invalid
    // return {
    //     statusCode: 500,
    //     body: JSON.stringify(
    //         {
    //             "message": "test",
    //             "results": []
    //         }
    //     )
    // }
}
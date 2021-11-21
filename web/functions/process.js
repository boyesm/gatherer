const isValidDomain = require("is-valid-domain");

exports.handler = async (event) => {

    const {domain = ""} = event.queryStringParameters;
    const {n_results = 10} = event.queryStringParameters;  // number of results to be returned

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
        const emails = dbo.collection("emailtest");
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

        for (var i = 0; i < sortable.length; i++) {
            results.push(
                {
                    "email": sortable[sortable.length - i - 1][0],
                    "n_appearances": sortable[sortable.length - i - 1][1]
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
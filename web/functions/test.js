const isValidDomain = require("is-valid-domain");
exports.handler = async (event) => {

    const {domain = ""} = event.queryStringParameters;
    const {results = 10} = event.queryStringParameters;  // number of results to be returned

    const isValidDomain = require('is-valid-domain')

    // validate domain
    if(!isValidDomain(domain)){
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

    // ENTER JARVIS' CODE HERE!!!!!

    // {
    //     "message": "None"
    //     "results": [
    //         {
    //             "email": "email@email.com",
    //             "n_appearences": "10"
    //         },
    //         {
    //             "email": "email@email.com",
    //             "n_appearences": "10"
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
    return {
        statusCode: 500,
        body: JSON.stringify(
            {
                "message": "test",
                "results": []
            }
        )
    }
}
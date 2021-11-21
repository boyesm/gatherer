function isValidDomain(domain) {
    const pattern = /([a-z0-9A-Z]\.)*[a-z0-9-]+\.([a-z0-9]{2,24})+(\.co\.([a-z0-9]{2,24})|\.([a-z0-9]{2,24}))*/g;
    return pattern.test(domain)
}

function displayUserMessage(message) {
    document.getElementById('user-message').innerHTML = message
    document.getElementById('user-message').style.display = "block"
}

function hideUserMessage() {
    document.getElementById('user-message').style.display = "none"
}

function newSearchResultLine(text, number) {
    return `<li class="list-group-item d-flex justify-content-between align-items-center p-3">
            ${text}
            <span class="badge bg-primary rounded-pill">${number}</span>
    </li>`
}

function searchLoadingOn() {
    document.getElementById('domain-search-button').innerHTML = `
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Loading...
    `
}

function searchLoadingOff() {
    document.getElementById('domain-search-button').innerHTML = `Search`
}

async function search() {
    searchLoadingOn()

    // get domain from textbox
    let domain = document.getElementById('domain-search-box').value

    // TODO: if this takes longer than n seconds, display an error
    let req = await fetch(`/.netlify/functions/process?domain=${domain}`)

    // get data from database
    // end point will return either an error or a list of domains

    console.log(req)

    let rt = await req.text()
    let obj = await JSON.parse(rt)

    if (req.status != 200) {

        // display message from
        displayUserMessage(`Error: ${obj.message}`)
        searchLoadingOff()
        return

    } else {

        // hide user message? hideUserMessage()

        // display all enteries
        output = ""
        // console.log(rt)
        await obj.results.forEach(
            element => {
                output += newSearchResultLine(element.email, element.type) // element.n_appearances)
            }
        )
        document.getElementById('search-results').innerHTML = output

        searchLoadingOff()
    }


    // .then(r => r.text())
    // .then(rt => JSON.parse(rt))
    // .then(obj => displayUserMessage(obj.domain))

    // // basic validitation
    // // const isValidDomain = require("is-valid-domain")  // use this on the endpoint to validate domain before searching!!!
    // if(!isValidDomain(domain)){
    //     // false, display message to user
    //     displayUserMessage("Domain is invalid")
    //     return
    // }
    //
    // // if true, send request to endpoint
    // displayUserMessage("Searching...")
    //
    // // use domain to hit endpoint, output is json
    // // fetch(`domain.com/api/?${domain}`)
    // //     .then(json_text => JSON.parse(json_text))
    // //     .then() // create a list of all the unique emails for a given domain
    // //     .then() // generate the html
    //
    // let obj = {
    //   "results": [
    //     {
    //       "email": "example@domain.com",
    //       "urls_found_at": [
    //         "domain.com/contact",
    //         "domain.com/about",
    //         "someblog.com/article-123"
    //         ]
    //     },
    //     {
    //       "email": "test@domain.com",
    //       "urls_found_at": [
    //          "domain.com/about",
    //          "domain.com/slacshsh"
    //       ]
    //     }
    //   ]
    // }
    //
    // hideUserMessage()
    //
    // displaySearchResults()


}
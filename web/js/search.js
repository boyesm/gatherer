function isValidDomain(domain) {
    const pattern = /([a-z0-9A-Z]\.)*[a-z0-9-]+\.([a-z0-9]{2,24})+(\.co\.([a-z0-9]{2,24})|\.([a-z0-9]{2,24}))*/g;
    return pattern.test(domain)
}

function displayUserMessage(message){
    document.getElementById('user-message').innerHTML = message
    document.getElementById('user-message').style.display = "block"
}

function hideUserMessage(){
    document.getElementById('user-message').style.display = "none"
}

function newSearchResultLine(text, number){
    return `<li class="list-group-item d-flex justify-content-between align-items-center">
            ${text}
            <span class="badge bg-primary rounded-pill">${number}</span>
    </li>`
}

function displaySearchResults(){
    output = ""
    output += newSearchResultLine("brenda@example.com", 12)
    document.getElementById('search-results').innerHTML = output
}

function search() {
    // get domain from textbox
    let domain = document.getElementById('domain-search-box').value

    // basic validitation
    // const isValidDomain = require("is-valid-domain")  // use this on the endpoint to validate domain before searching!!!
    if(!isValidDomain(domain)){
        // false, display message to user
        displayUserMessage("Domain is invalid")
        return
    }

    // if true, send request to endpoint
    displayUserMessage("Searching...")

    // use domain to hit endpoint, output is json
    // fetch(`domain.com/api/?${domain}`)
    //     .then(json_text => JSON.parse(json_text))
    //     .then() // create a list of all the unique emails for a given domain
    //     .then() // generate the html

    let obj = {
      "results": [
        {
          "email": "example@domain.com",
          "urls_found_at": [
            "domain.com/contact",
            "domain.com/about",
            "someblog.com/article-123"
            ]
        },
        {
          "email": "test@domain.com",
          "urls_found_at": [
             "domain.com/about",
             "domain.com/slacshsh"
          ]
        }
      ]
    }

    hideUserMessage()

    displaySearchResults()


}
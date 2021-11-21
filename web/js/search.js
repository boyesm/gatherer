function isValidDomain(domain) {
    const pattern = /([a-z0-9A-Z]\.)*[a-z0-9-]+\.([a-z0-9]{2,24})+(\.co\.([a-z0-9]{2,24})|\.([a-z0-9]{2,24}))*/g;
    return pattern.test(domain)
}

function newSearchResultLine(text, number) {
    return `<li class="list-group-item d-flex justify-content-between align-items-center p-3">
            ${text}
            <span class="badge bg-primary rounded-pill">${number}</span>
    </li>`
}

function demoSearch() {
    document.getElementById('domain-search-box').value = "uwo.ca"
    search()
}


// toggle elements
function displayUserMessage(message) {
    document.getElementById('user-message').innerHTML = message
    document.getElementById('user-message').style.display = "block"
}

function hideUserMessage() {
    document.getElementById('user-message').style.display = "none"
}


function searchLoadingOn() {
    document.getElementById('domain-search-button').innerHTML = `
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Loading...
    `
}

function searchLoadingOff() {
    document.getElementById('domain-search-button').innerHTML = `Find email addresses`
}

function demoTextOff() {
    document.getElementById('demo-text').style.display = "none"
}

function demoTextOn() {
    document.getElementById('demo-text').style.display = "block"
}

function searchTuningOn() {
    document.getElementById('search-tuner').style.display = "block"
}

function searchTuningOff() {
    document.getElementById('search-tuner').style.display = "none"
}


// views
function enterInitialView() {
    // this view is the initial view when loading the webpage
    demoTextOn()
    // hideUserMessage()
    searchTuningOff()
    searchLoadingOff()
}

function enterLoadingView() {
    // this is the view after the search has been submitted, but before the results appear
    demoTextOff()
    searchLoadingOn()
}

function enterSearchView() {
    // this view is the initial view when loading the webpage
    demoTextOff()
    searchTuningOn()
    hideUserMessage()
    searchLoadingOff()
}

let email_obj
let n_of_displayed_personal = 0  // number of currently displayed personal emails
let n_of_displayed_generic = 0  // number of currently displayed generic emails

async function displayEmails(emailType, display_n=10) {

    if (emailType == "personal") {

        n_of_displayed_personal = 0
        let output = ""
        let i = 0
        while (n_of_displayed_personal < display_n) {

            let element = email_obj[i]

            if (element.type == "personal") {
                output += newSearchResultLine(element.email, element.type) // element.n_appearances)
                n_of_displayed_personal += 1
            }
            i+=1
        }

        document.getElementById('search-results').innerHTML = output

    } else if (emailType == "generic") {

        n_of_displayed_generic = 0
        let output = ""
        let i = 0
        while (n_of_displayed_generic < display_n) {

            let element = email_obj[i]

            if (element.type == "generic") {
                output += newSearchResultLine(element.email, element.type) // element.n_appearances)
                n_of_displayed_generic += 1
            }
            i+=1
        }

        document.getElementById('search-results').innerHTML = output


    }
}


async function search() {
    enterLoadingView()

    let domain = document.getElementById('domain-search-box').value  // get domain from textbox

    // TODO: if this takes longer than n seconds, display an error
    let req = await fetch(`/.netlify/functions/process?domain=${domain}`)

    // console.log(req)

    let rt = await req.text()
    let obj = await JSON.parse(rt)

    if (req.status != 200) {  // error has occurred

        displayUserMessage(`Error: ${obj.message}`)
        enterInitialView()
        return

    } else {

        email_obj = obj.results
        console.log(email_obj)

        // display all enteries
        displayEmails("personal", 10)

        enterSearchView()

        return
    }


}
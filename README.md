![gatherer logo](media/gatherer-logo-horizontal.png)

Gatherer is a free alternative to Hunter.io. Users can input a domain in our website and we will search our database for
all the emails that we've found across the web that match that domain. For example, if a user is looking for the professional emails
of employees of GitHub, they can input the domain `github.com` into our service and emails that end in that domain like `alex@github.com`
or `todd@github.com` will appear.

## How it works

Our service can be broken down into a few main components: web scraping and data cleaning, data storage, and data serving.

### Web Scraping and Email Cleaning

We've built a custom scraper built in Python using the Scrapy framework. The scraper starts off with a list of URLs and then
continues through every link it finds. It uses a custom algorithm to find all emails in each webpage and uses an external 
email verifying library to ensure the emails are valid before inputting them into the database.

### Data Storage

We store all the emails in MongoDB. This database was used because it's easy to quickly iterate on the schema.

### Serving Content

We used AWS Lambda functions written in Node.js to serve content from the database to our web client.

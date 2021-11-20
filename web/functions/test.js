exports.handler = async (event) => {

  const { domain = "" } = event.queryStringParameters;




  return {
    statusCode: 200,
    body: JSON.stringify(
        {
          message: "Hello World",
          "domain": domain
        }
    )
  }
}
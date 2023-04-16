// Get Quote From API

async function getQuote() {

    
    /*
    NOTE: proxyURL is a fix to this error:

    ERROR:
    has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled. 
    
    Instructions: 
    1. Declare the proxy URL
    2. add proxy url to await fetch
    */

    const proxyUrl = 'https://corsproxy.io/?'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json()
        console.log(data)
    } catch (error) {
        //recall getQuote() if encounters error
        getQuote()
        console.log('No Quote', error)
    }
}

//On Load

getQuote();
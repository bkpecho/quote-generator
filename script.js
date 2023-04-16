const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

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

        // Handle blank quoteAuthor
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown'
        }else{
            authorText.innerText = data.quoteAuthor
        }

        //Reduce font size for long quotes
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote')
        }else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText


    } catch (error) {
        //recall getQuote() if encounters error
        // getQuote()
        console.log('No Quote', error)
    }
}

// Tweet Quote

function tweetQuote() {
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}

// Event Listener
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

//On Load

getQuote();
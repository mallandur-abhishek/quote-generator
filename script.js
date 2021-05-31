// Get Quotes from API
let apiQuotes = [];

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const newQuote = () => {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    quoteText.innerText = quote.text;
    if (!quote.author) {
        authorText.innerText = "Unknown";
    } else
        authorText.innerText = quote.author;


    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    loading(false);
}

const tweetQuote = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterURL, '_blank');
}

const loading = (flag = true) => {
    if (flag) {
        loader.hidden = false;
        quoteContainer.hidden = true;
    } else {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

async function getQuotes() {
    loading(true);
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        setTimeout(() => {
            newQuote();
        }, 1000);

    } catch (error) {
        console.log(error);
    }
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
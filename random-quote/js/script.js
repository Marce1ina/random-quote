const tweetLink = "https://twitter.com/intent/tweet?text=";
const quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
    fetch(quoteUrl, { cache: "no-store" })
        .then(resp => resp.json())
        .then(response => createTweet(response));
}

function createTweet(data) {
    const quote = data[0];
    const div = document.createElement("div");
    div.innerHTML = quote.content;

    const quoteText = div.innerText.trim();
    const quoteAuthor = quote.title.length ? quote.title : "Unknown author";
    const tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

    if (tweetText.length > 140) {
        getQuote();
    } else {
        const tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector(".quote").innerText = quoteText;
        document.querySelector(".author").innerText = "Author: " + quoteAuthor;
        document.querySelector(".tweet").setAttribute("href", tweet);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    getQuote();
    document.querySelector(".trigger").addEventListener("click", function() {
        getQuote();
    });
});

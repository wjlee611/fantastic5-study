const quotes = [
    {
        quote: "One man with courage makes a majority.",
        author: "Andrew Jackson"
    },
    {
        quote: "There is nothing in the world so irresistibly contagious as laughter and good humor.",
        author: "Charles Dickens",
    },
    {
        quote: "Our remedies oft in ourselves do lie.",
        author: "Shakespeare",
    },
    {
        quote: "We do not act rightly because we have virtue or excellence, but we rather have those because we have acted rightly.",
        author: "Aristotle",
    },
    {
        quote: "Be slow to fall into friendship; but when thou art in, continue firm & constant.",
        author: "Socrates",
    },
    {
        quote: "To know is nothing at all; to imagine is everything.",
        author: "Anatole France",
    },
    {
        quote: "Like all great travellers, I have seen more than I remember, and remember more than I have seen.",
        author: "Benjamin Disraeli",
    },
    {
        quote: "Nothing is more despicable than respect based on fear.",
        author: "Albert Camus",
    },
    {
        quote: "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
        author: "Antoine de Saint-Exupery",
    },
    {
        quote: "You can learn a little from victory; you can learn everything from defeat.",
        author: "Christy Mathewson",
    },
]

const quote = document.querySelector("#quote span:first-child");    
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];  //랜덤으로 명언 가져오기

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
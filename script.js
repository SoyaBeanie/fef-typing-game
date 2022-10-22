const quotes = ["She looks too pure to be pink", "You are a fake and a liar and I wish I had never laid eyes on you",
                "Oh Blanche, stop blubbering", "Twinkies and wine", "That's cool baby you know how it is rocking and rolling and whatnot",
                "A lock of hair from her chest", "My head is saying fool forget him, my heart is saying don't let go", 
                "Why it could be greased lightening", "Tell me about it stud"];
const quote = document.getElementById('quote');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');
const message = document.getElementById('message');
const gamerName = document.getElementById('gamer-name');
const scoresUnorderedList = document.getElementById('score-unordered-list');
const scores = getScores();

// let targetWord;
let wordQueue
let startTime

function startGame() {
    console.log("Game started!");

    const scoreItem = {
        name: gamerName.value,
        milliseconds: 0
    };

    scores.push(scoreItem)
    console.log("The scores array is now", scores)

    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quoteText = quotes[quoteIndex]
    wordQueue = quoteText.split(" ");
    // targetWord = "typeme";
    quote.innerHTML = wordQueue.map(word=> (`<span>${word}</span>`)).join(' ');
    // quote.innerHTML=`<span>${targetWord}</span>`;

    highlightPosition = 0;
    quote.childNodes[highlightPosition].className = 'highlight';

    startTime = new Date().getTime();
    document.body.className = "";
    start.className = 'started';
    setTimeout(()=> {start.className = 'button';}, 2000);

    }

function checkInput() {
    const currentWord = wordQueue[0].replaceAll(".","").replaceAll(",","");
    const typedValue = input.value.trim();
    if(currentWord != typedValue) {
        input.className = currentWord.startsWith(typedValue) ? "" : "error";
        return;
    }
    console.log("Checking, input.value")
    wordQueue.shift()
    input.value = ""; //empty textboc
    quote.childNodes[highlightPosition].className = ""; //unhighlight the word
}

function gameOver() {

    const elapsedTime = new Date().getTime() - startTime;
    document.body.className = "winner";
    message.innerHTML = `<span class="congrats">Congratulations!</span><br> You finished in ${elapsedTime/1000} seconds`;

    const lastScoreItem = scores.pop();
    lastScoreItem.milliseconds = elapsedTime
    scores.push(lastScoreItem);
    console.log('The scores array at the end of the game is ', score);

    saveScores();

    //clear out the list
    while(scoresUnorderedList.firstChild) {
        scoresUnorderedList.removeChild(scoresUnorderedList.firstChild);
    }

    //rebuild list with new score
    for(let score of getScores()) {
        const li = createElementForScore(score);
        console.log('li is ' + li);
        scoresUnorderedList.appendChild(li);
    }
}

function getScores() {
    const noScoreFound = "[]";
    const scoresJSON = localStorage.getItem('scores') || noScoreFound;
    return JSON.parse(scoresJSON);
}

function saveScores() {
    const data = JSON.stringify(scores);
    localStorage.setItem('scores', data);
}

function createElementForScore(score) {
    const template = document.getElementById("scoreItemTemplate");
    const newListItem = template.content.cloneNode(true);

    const text = newListItem.querySelect(".score-text");
    text.innerText = score.name + "in " + score.milliseconds/1000 + "seconds."
    return newListItem
}

start.addEventListener('click', startGame);
input.addEventListener('input', checkInput)

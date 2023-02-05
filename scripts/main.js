/**********************************************************************/
/*                      GLOBALS                                       */
/**********************************************************************/

let $g = {
    settings: {
        levels: ["Beginner", "Easy", "Medium", "Hard", "Advanced"]
    },
    user: {
        thisLevel: "Beginner",
        score: 0,
        page: "page-home",
        thisReading: [],
        readingIndex: 0,
        readingIndexMax: 0
    },
    els: {
        pageHome: "",
        pageGame: "",
        pageSettings: "",
        reader: "",
        score: ""
    }
}




/**********************************************************************/
/*                    HELPER FUNCTIONS                                */
/**********************************************************************/

const buildReadingArray = () => {
    /// get array based on difficulty and randomize it
    let arr = $list[$g.user.thisLevel];
    $g.user.readingIndexMax = arr.length;
    return arr.sort(() => Math.random() - 0.5);
}


const loadPage = (pageId) => {

    //// first turn off display of all pages
    $g.els.pageHome.style.display = "none";
    $g.els.pageGame.style.display = "none";
    $g.els.pageSettings.style.display = "none";

    /// get page Object property name from pageId
    const arrPage = pageId.split("-");
    const page = arrPage[0] + arrPage[1][0].toUpperCase() + arrPage[1].substring(1);
    $g.els[page].style.display = "flex";

    /// set user variables: page, reset score
    $g.user.page = pageId;
    $g.user.score = 0;

    /// load reading array if it's the game page
    if (pageId === 'page-game') {
        $g.user.thisReading = buildReadingArray();
        $g.els.score.innerHTML = $g.user.score;
        loadReading();
    }
}




    






/**********************************************************************/
/*                           FUNCTIONS                                */
/**********************************************************************/
const init = () => {    
    /// set global var to common DOM elements
    $g.els.pageHome = document.getElementsByClassName('page-home')[0];
    $g.els.pageGame = document.getElementsByClassName('page-game')[0];
    $g.els.pageSettings = document.getElementsByClassName('page-settings')[0];
    $g.els.reader = document.getElementsByClassName('readerText')[0];
    $g.els.score = document.getElementsByClassName('scoreboard')[0];
    

    ////// DEVELOPMENT ONLY //////////////
    console.log("DOM Loaded.")
    loadPage('page-home');

    createEventListeners();
}

/////// HOME PAGE ////////////////////////
const selectedDifficultyLevel = (level) => {
    //console.log(`Level selected. Text = ${level.text}. ID = ${level.id}`);
    $g.user.thisLevel = level.text;
    loadPage('page-game');
}



//////// GAME PAGE  /////////////////////

function loadReading() {
    $g.els.reader.innerHTML = $g.user.thisReading[$g.user.readingIndex];
}

const correctOrWrongClicked = (button) => {
    /// update score
    if (button) { $g.user.score++ };
    $g.els.score.innerHTML = $g.user.score;

    /// update reading array index
    $g.user.readingIndex = $g.user.readingIndex < $g.user.readingIndexMax - 1 ? $g.user.readingIndex+1 : 0;

    loadReading();

}




/**********************************************************************/
/*                  EVENT LISTENERS                                   */
/**********************************************************************/

function createEventListeners() {

    //// Home Page -- select Difficulty Level
    [...document.querySelectorAll('.btn-difficulty')].forEach(item => {
        item.addEventListener("click", (e) => {
            console.log(e);
            const level = { 
                text: e.target.parentElement.children[0].innerHTML, 
                id: e.target.id
            }
            selectedDifficultyLevel (level);
        });
    });

    //// Game Page -- right or wrong answer
    document.getElementsByClassName('btn-correct')[0].addEventListener('click', () => {
        correctOrWrongClicked(true)
    });
    document.getElementsByClassName('btn-wrong')[0].addEventListener('click', () => {
        correctOrWrongClicked(false)
    });
    document.getElementsByClassName('btn-home')[0].addEventListener('click', () => {
        loadPage('page-home');
    });


}

document.addEventListener("DOMContentLoaded", (e) => {
    init();

})
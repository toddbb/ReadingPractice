console.log("Hey");

/**********************************************************************/
/*                      GLOBALS                                       */
/**********************************************************************/

let $g = {
    settings: {
        levels: ["Beginner", "Easy", "Medium", "Hard", "Advanced"]
    },
    user: {
        thisLevel: ""
    }
}


/**********************************************************************/
/*                        FUNCTIONS                                   */
/**********************************************************************/
const init = () => {
    console.log("DOM Loaded.")
}




    





/**********************************************************************/
/*                  EVENT LISTENERS                                   */
/**********************************************************************/

[...document.querySelectorAll('.btn-difficulty')].forEach(item => {
    item.addEventListener("click", (e) => {
        console.log(item);
    });
});

addEventListener("DOMContentLoaded", (e) => {
    // this is where to execute code

})
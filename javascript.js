function operate(number1, number2){
    // This function will call operation functions 
}

// Objects: This section contains the objects used in this program

let operations = {
    "addition" : function(a,b){return a + b},
    "subtraction" : function(a,b){return a - b},
    "multiplication" : function(a,b){return a * b},
    "division" : function(a,b){return a / b}
};

// This Object will store the users input  values for processing
let values = {
    "number 1" : undefined,
    "number 2" : undefined,
    "operator" : undefined
};

// Get the value of first number 
const screen = document.querySelector('.calculator-screen');
const buttons = document.querySelector('.calculator-buttons');

/* This function will get the value displayed on the calculator */
function getValue(value){

    if (values.operator === undefined){
        screen.textContent = "0";
    }

    // Listen for Number input from user's mouse
    buttons.addEventListener('click', getNumberOnScreen);

    // This function will display numbers on  the screen
    function getNumberOnScreen(e){
        // Check that button is a number or decimal point
        if (!e.target.classList.contains("operand"))
            return;

        // Change default value from 0 to user  input
        if (screen.textContent === "0"){
            screen.textContent = e.target.value;
        }
        // Append value to screen if there are less than 12 characters on the screen and this is not initial input
        else if (screen.textContent.length < 11){
            screen.append(e.target.value);

            // Disable decimal after one press
            if (e.target.value === "."){
                e.target.disabled = true;
            }
        }
        else{
            // Don not add value to screen if screen is full
            return; 
        }
    }
}


// Listen for the start of an operation
buttons.addEventListener('click', getOperator);

function getOperator(e){
    if (e.target.classList.contains("operator")){
        values["operator"] = e.target.value;
    }
}

/* This function clears calculator memory */
function clearMemory(){
    
    // Listen for a memory clear
    buttons.addEventListener("click", clear);

    // This function will clear the calculator 
    function clear(e){
    if (e.target.classList.contains('clear'))
        getValue();
    }

    
}

function undo(){

    // Listen for the delete button
    buttons.addEventListener("click", del);

    // This function will remove the last number on the calc screen
    function del(e){
        if (e.target.classList.contains("delete")){
           screen.textContent= screen.textContent.slice(0,-1);
        }
    }

}


getValue();
clearMemory();
undo();
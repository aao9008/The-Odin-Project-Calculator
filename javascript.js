function operate(number1, number2){
    // This function will call operation functions 
}

operators = {
    "addition" : function(a,b){return a + b},
    "subtraction" : function(a,b){return a - b},
    "multiplication" : function(a,b){return a * b},
    "division" : function(a,b){return a / b}
};

// Get the value of first number 
const screen = document.querySelector('.calculator-screen');
const numbers = document.querySelector('.calculator-buttons');


// This function will display numbers on  the screen
function getNumberOnScreen(e){
    if (e.target.class != operand)
}
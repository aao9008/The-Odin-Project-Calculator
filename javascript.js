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
    // Check that button is a number or decimal point
    if (!e.target.classList.contains("operand"))
        return;

    // Add value to screen if there are less than 12 characters on the screen
    if (screen.textContent.length < 11){
        screen.append(e.target.value);

        // Disable decimal after one press
        if (e.target.value === "."){
            e.target.disabled = true;
        }
    }
    else{
        return; // Don not add value to screen if screen is full
    }
}

// Listen for Number input
numbers.addEventListener('click', getNumberOnScreen);

//////// Load required objects and listeners /////////////////
const buttons = document.querySelector('.calculator-buttons');
const screen = document.querySelector('.calculator-screen');
const decimal = document.querySelector('.decimal');

 // Objects: This section contains the objects used in this program
 let operations = {
    "addition" : function(a,b){return a + b},
    "subtraction" : function(a,b){return a - b},
    "multiplication" : function(a,b){return a * b},
    "division" : function(a,b){return a / b}
};

// This Object will store the users input  values for processing
const values = {
    "number 1" : undefined,
    "number 2" : undefined,
    "operator" : undefined,
};
/////////////////////////////////////////////////////////////////

operate();

function operate(){    
    // This function will call operation functions 
    clearMemory();

    undo();

    getValue();

    getOperator();

    evaluate();
}

/* This function will get the value displayed on the calculator */
function getValue(value){

    // Initialize calculator screen to zero
    if (values["number 1"] === undefined){
        screen.textContent = "0";
    }

    // Listen for Number input from user's mouse
    buttons.addEventListener('click', getNumberOnScreen);

    // This function will display numbers on  the screen
    function getNumberOnScreen(e){
        
        // Check that button is a number or decimal point
        if (!e.target.classList.contains("operand"))
            return;

        // This will clear the screen when entering first value of second number is being entered
        if (parseFloat(screen.textContent) === values['number 1'] && values['operator'] !== undefined){
            screen.textContent = "";
        }
        
        // Append value to screen if there are less than 12 characters on the screen and this is not initial input
        if (screen.textContent.length < 11 && values['operator'] === undefined){
            let value = screen.textContent + e.target.value;
            screen.textContent = parseFloat(value);
            values['number 1'] = parseFloat(value);
        }

        else if (screen.textContent.length < 11 && values['operator'] !== undefined){
            value = screen.textContent + e.target.value;
            screen.textContent = parseFloat(value);
            values['number 2'] = parseFloat(value);
        }

        else{
            // Don not add value to screen if screen is full
            return; 
        }

    }
}

/* This Function will start the calculation process */
function getOperator(){
    // Listen for the start of an operation
    buttons.addEventListener('click', getOperatorValue);

    function getOperatorValue(e){
        if (e.target.classList.contains("operator")){
            values["operator"] = e.target.value;
            values["new value"] = true;
            console.log(values["operator"]);
        }
    }
}

/* This function clears calculator memory */
function clearMemory(){
    
    // Listen for a memory clear
    buttons.addEventListener("click", clear);

    // This function will clear the calculator 
    function clear(e){
        if (e.target.classList.contains('clear')){
        
            //Reset the calculator screen
            screen.textContent = 0;

            // Iterate over the values object and reset them all to undefined.
            for (const property in values){
                values[property] = undefined;
            }
        }
    }
}

/* This function will remove the last character on screen */
function undo(){

    // Listen for the delete button
    buttons.addEventListener("click", del);

    // This function will remove the last number on the calc screen
    function del(e){
        if (e.target.classList.contains("delete")){
            if (screen.textContent != "0"){
                screen.textContent= screen.textContent.slice(0,-1);
            }

            if (screen.textContent.length === 0){
                screen.textContent = 0;
            }
           
        }
    }

}

/* This function evaluates the expression */
function evaluate(){

    buttons.addEventListener("click", getResults);

    function getResults(e){
        // Calculate results if both values have been acquired and user hit equals or another operator button
        if (e.target.classList.contains('evaluate') || e.target.classList.contains('operator') && values[number2] !== undefined){
            let operator = values['operator'];
            let number1 = values['number 1'];
            let number2 = values['number 2'];

            let result = Math.round(operations[operator](number1,number2)).toFixed(3);

            screen.textContent = result;

            values['number 1'] = result;
            values['number 2'] = undefined;
        }
    }
}

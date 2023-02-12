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



/* This Section deals with getting the users input on the display and storing it */

    // Initialize calculator screen to zero
if (values["number 1"] === undefined){
    screen.textContent = "0";
}

// Listen for Number input from user's mouse
buttons.addEventListener('click', getValue);

// This function will display numbers, and get values of user input
function getValue(e){
    let display = screen.textContent + e.target.value;

    // Check if user is inputting a decimal point
    if (e.target.classList.contains("decimal") && !screen.textContent.includes(".")){
        screen.textContent = display;
    }
    // Check that button is a number and display has less than 11 characters
    if (!e.target.classList.contains("operand") || screen.textContent.length >= 11){
        return;
    }
    // If this is is initial start state of calculator or start of second value, throwaway current value
    if (screen.textContent === "0" || (screen.textContent === values['number 1'] && values['operator'] !== undefined) ){
        screen.textContent = e.target.value;
        console.log("aye");
    }
    // Just append value to current value if this is not initial state
    else{
        screen.textContent = display;
        console.log("fuck me")
    }
    // Store value as string in object for processing and calculation later
    if (values['operator'] === undefined){
        values['number 1'] = screen.textContent;
    }
    else{
        values['number 2'] = screen.textContent;
    }
}

/* This section will store the value of user operator choice and flag the start of a new value */

// We are using operators to delimitate user input values

    // Listen for the start of an operation
    buttons.addEventListener('click', getOperator);

// This function will get the operator
function getOperator(e){
    // Operator only saved if second value has not been stored yet.
    if (e.target.classList.contains("operator") && values['number 2'] === undefined){
        values["operator"] = e.target.value;
        console.log(values["operator"]);
    }
}

/* This Section clears calculator memory */

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

/* This function will remove the last character on screen */

// Listen for the delete button
buttons.addEventListener("click", del);

// This function will remove the last number on the calc screen
function del(e){
    if (e.target.classList.contains("delete")){
        if (screen.textContent != "0"){
            screen.textContent= screen.textContent.slice(0,-1); // Slice out every character except the last 
        }

        // If all values are deleted, set display back to default 0
        if (screen.textContent.length === 0){
            screen.textContent = 0;
        }    
    }
}

/* This section will preform calculation*/
buttons.addEventListener("click", function(e){
    getResults(e);
    invertSign(e);
    convertToPercent(e);
});

function getResults(e){

    let operator = values['operator'];
    let number1 = parseFloat(values['number 1']);
    let number2 = parseFloat(values['number 2']);
    let result;

    // TEE HEE, this is my first easter egg!
    if (e.target.classList.contains("evaluate") && values['number 2'] === undefined){
        if (screen.textContent === "8008132" || screen.textContent === "800813"){
            screen.textContent = "BOOBIES"
            return;
        }
        // Allows user to hit minus, then input value and evaluate to get a negative. 
        else{
            result = number1 * 2;

            processResults(result, e);

            console.log("works")

        }
    }
 
    else if (e.target.classList.contains('evaluate') || (e.target.classList.contains('operator') && values['number 2'] !== undefined)){

        if (number2 === 0 && operator === "division"){
            screen.textContent = "LMFAO";
            return;
        }

        // Round decimal number to 3 decimal places
        result = (operations[operator](number1,number2)).toFixed(5);

        processResults(result, e);

        console.log(result);
    }
}

// This function will process our results and display results in the format we are looking for. 
function processResults(result, e){
     // Parse one more time to remove any trailing zeros.
     result = parseFloat(result);

     console.log(result);

     // Return error if result length exceeds limit of screen
     if (result.toString().length > 11){
        screen.textContent = 'Error';
    }
    else{
        // Display result to user
        screen.textContent = result;
        // Store result as value 1 and revert value 2 to undefined. Calculator is ready to calculate another expression
        values['number 1'] = result.toString();
        values['number 2'] = undefined;
    }
 
     if (e.target.classList.contains('operator')){
         values['operator'] = e.target.value;
         console.log(values['operator']);
     }

}
// Provide ability to convert number on screen to negative and vice versa
function invertSign(e){
    if (e.target.classList.contains("plusMinus") && parseFloat(screen.textContent) > 0){
        if(!screen.textContent.includes("-")){
            screen.textContent = "-" + screen.textContent;
        }
        else{
            screen.textContent = screen.textContent.slice(1);
        }

        if (values['operator'] === undefined){
            values['number 1'] = screen.textContent;
        }
        else{
            values['number 2'] = screen.textContent;
        }

        console.log(values);
    }
}

// Convert value on screen to percent 
function convertToPercent(e){
    if (e.target.classList.contains("percent") && parseFloat(screen.textContent) > 0){
        
        let result = parseFloat(screen.textContent) / 100;

        if (result.toString().length > 11){
            screen.textContent = 'Error';
            return;
        }

        screen.textContent = result;

        if (values['operator'] === undefined){
            values['number 1'] = screen.textContent;
        }
        else{
            values['number 2'] = screen.textContent;
        }

        console.log(values);
    }
}
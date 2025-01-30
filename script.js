function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
    return parseFloat(num1) / parseFloat(num2);
}

function operate(operand1, operator, operand2) {
    switch(operator) {
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case 'x':
            return multiply(operand1, operand2);
        case '÷':
            return divide(operand1, operand2);
        default:
            console.log('Error: No valid operator!');
    }
}

function numericalClicked(number) {
    if (currentStage === 'operator') {
        display.value = '';
        currentStage = 'second operand';
    }

    if (currentStage === 'first operand') {
        display.value = display.value + number;
        firstOperand = display.value;
    } else if (currentStage === 'second operand') {
        toggleOperator();
        display.value = display.value + number;
        secondOperand = display.value;
    }  
}

function operatorClicked(input) {
    currentStage = 'operator';
    //this returns an error... find out why!
    if (!firstOperand) return;
    // Evaluate and display first pair of number
    if (secondOperand) {
        equalClicked();
        display.value = firstOperand;
    }

    if (!secondOperand) {
        if (operator) toggleOperator();
        operator = input;
        toggleOperator();
    }
}

function equalClicked() {
    if (!firstOperand || !operator || !secondOperand) {
        console.log('operation is not complete yet!');
    } else {
        let result = operate(firstOperand, operator, secondOperand);
        display.value = result;
        firstOperand = result;
        operator = undefined;
        secondOperand = undefined;
    }
    // else call the operate function and make result first operand
    // unless AC is clicked!
}

function toggleOperator() {
    if (!operator) return;
    let findOperator;
    switch (operator) {
        case '+':
            findOperator = 'add';
            break;
        case '-':
            findOperator = 'subtract';
            break;
        case 'x':
            findOperator = 'multiply';
            break;
        case '÷':
            findOperator = 'divide';
            break;
        default:
            console.log('Error: No valid operator!');
    }

    const operatorButton = document.querySelector(`.${findOperator}`);
    operatorButton.classList.toggle('active-operator');
}

function buttonClick(event) {
    const numerical = '1234567890.';
    let currentButtonValue = event.target.textContent;

    if (currentButtonValue === '=') {
        equalClicked();
        return;
    }

    if (numerical.includes(currentButtonValue)) {
        numericalClicked(currentButtonValue);
    } else {
        operatorClicked(currentButtonValue);
    }
}

let operator;
let firstOperand;
let secondOperand;
let currentStage = 'first operand';

const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');

buttons.forEach((button) => {
    button.addEventListener('click', buttonClick);
});
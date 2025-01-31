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
    if (num2 === '0') {
        setTimeout(clearClicked, 1000);
        return 'Nice Try!';
    }
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
        toggleOperator();
        display.value = '';
        currentStage = 'second operand';
    }

    if (currentStage === 'first operand') {
        display.value = display.value + number;
        firstOperand = display.value;
    } else if (currentStage === 'second operand') {
        display.value = display.value + number;
        secondOperand = display.value;
    }  
}

function operatorClicked(input) {
    if (!firstOperand) return;
    currentStage = 'operator';

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
        checkOverflow();
    }
    // If AC is clicked, reset completely

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
    const numerical = '1234567890';
    let currentButtonValue = event.target.textContent;

    switch (currentButtonValue) {
        case '=':
            equalClicked();
            return;
        case 'AC':
            clearClicked();
            return;
        case '.':
            dotClicked();
            return;
    }

    if (numerical.includes(currentButtonValue)) {
        numericalClicked(currentButtonValue);
    } else {
        operatorClicked(currentButtonValue);
    }
}

function checkOverflow() {
    // 13 is the arbitrary number I chose for when input starts overflowing
    const dotIndex = display.value.indexOf('.');
    const displayLength = display.value.length - 1;
    const spaceAvailable = 13 - dotIndex;

    // Checks if decimal places are greater than 2 and is overflowing
    if (dotIndex !== -1 && displayLength - dotIndex > 2 && displayLength >= 14) {
        display.value = parseFloat(display.value).toFixed(spaceAvailable);
    } else if (displayLength >= 13) {
        display.value = display.value.slice(0, 13);
    }
}

function clearClicked() {
    toggleOperator();
    display.value = '';
    operator = undefined;
    firstOperand = undefined;
    secondOperand = undefined;
    currentStage = 'first operand';
}

function dotClicked() {
    if (display.value.indexOf('.') === -1) {
        display.value += '.';
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
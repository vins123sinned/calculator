function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operand1, operator, operand2) {
    switch(operator) {
        case '+':
            add(operand1, operand2);
            break;
        case '-':
            subtract(operand1, operand2);
            break;
        case '*':
            multiply(operand1, operand2);
            break;
        case '/':
            divide(operand1, operand2);
            break;
        default:
            console.log('Error: No valid operator!');
    }
}

let operator;
let firstOperand;
let secondOperand;
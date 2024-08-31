function add(a, b) {
    let sum = a + b;
    if (`${sum}`.length > 9) {
        return sum.toPrecision(3);
    }
    return sum;
}

function subtract(a, b) {
    let diff = a - b;
    if (`${diff}`.length > 9) {
        return diff.toPrecision(3);
    }
    return diff;
}

function multiply(a, b) {
    let prod = a * b;
    if (`${prod}`.length > 9) {
        return prod.toPrecision(3);
    }
    return prod;
}

function divide(a, b) {
    if (b == 0) {
        return "no chance!"
    } 
    let quotient = a / b;
    if (`${quotient}`.length > 9) {
        return quotient.toPrecision(3);
    }
    return quotient;
}

let operator;
let num1;
let num2;

function operate(op, a, b) {
    switch(op) {
        case '+':
            return add(a, b);
        
        case '-':
            return subtract(a, b);
        
        case 'x':
            return multiply(a, b);
        
        case '/':
            return divide(a, b);
    }
}

const display = document.querySelector('.display');

let newNumber = true;

let decimal = false;

let negative = false;

function populateDisplay(num) {
    if (newNumber) {
        if (!(display.innerText == '0' && num == '0')) {
            display.innerText = num;
            newNumber = false;
        }
    } else if (display.innerText.length < 9 ) {
        display.innerText += num;
    } else {
        display.innerText = (+(display.innerText + num)).toPrecision(3);
    }
}

const numberButtons = document.querySelectorAll('.nums');
numberButtons.forEach((btn) => {
    btn.addEventListener('click', () => populateDisplay(btn.innerText));
});

function clearAll() {
    operator = null;
    num1 = null;
    num2 = null;
    negative = false;
    decimal = false;
    newNumber = true;
    
    populateDisplay('0');
    newNumber = true;
}

const allClearButton = document.querySelector('#clear');
allClearButton.addEventListener('click', clearAll);

function equals() {
    newNumber = true;
    if (operator && num1) {
        num2 = +(display.innerText);
        let result = operate(operator, num1, num2);
        populateDisplay(result);
        newNumber = true;
    }
    num1 = null;
    num2 = null;
    operator = null;
    decimal = false;
};

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', equals);

function applyOperation(button) {
    newNumber = true;
        if (!num1) {
            num1 = +(display.innerText);
        } else {
            num2 = +(display.innerText);

            let result = operate(operator, num1, num2);
            populateDisplay(result);
            newNumber = true;
            decimal = false;

            num1 = result; 
            num2 = null;
        }
        operator = button.innerText;
}

const operatorButtons = document.querySelectorAll('.ops');
operatorButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        applyOperation(btn);
    });
});

function addDecimal() {
    if (!decimal) {
        if (newNumber) {
            populateDisplay('0');
        }
        populateDisplay('.');
        decimal = true;
    }
};

const decimalButton = document.querySelector('#dec');
decimalButton.addEventListener('click', addDecimal);

const signButton = document.querySelector('#sign');
signButton.addEventListener('click', () => {
    if (display.innerText != '0') {
        negative = !negative;
        newNumber = true;
        if (negative) {
            populateDisplay('-' + display.innerText);
        } else {
            populateDisplay(display.innerText.slice(1));
        }
    }
});

function backspace() {
    if (display.innerText != '0') {
        if (display.innerText.length == 1) {
            newNumber = true;
            populateDisplay('0');
            newNumber = true;
        } else {
            newNumber = true;
            populateDisplay(display.innerText.slice(0,-1));
        }
    }
};

const backspaceButton = document.querySelector('#del');
backspaceButton.addEventListener('click', backspace);

document.addEventListener('keydown', event => {
    switch (event.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            populateDisplay(event.key);
            break;
        case 'Enter':
            equals();
            break;
        case 'Backspace':
            backspace();
            break;
        case 'Decimal':
            addDecimal();
            break;
        case 'Multiply':
            applyOperation('x')
            break;
        case 'Add':
            applyOperation('+')
            break;
        case 'Subtract':
            applyOperation('-')
            break;
        case 'Divide':
            applyOperation('/')
            break;
        case 'Clear':
            clearAll();
            break;
    }
});
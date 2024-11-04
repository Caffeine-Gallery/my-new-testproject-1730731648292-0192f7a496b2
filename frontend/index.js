import { backend } from 'declarations/backend';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const loading = document.getElementById('loading');

let currentInput = '';
let operator = '';
let firstOperand = '';

buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});

async function handleButtonClick(value) {
    if (value >= '0' && value <= '9' || value === '.') {
        currentInput += value;
        updateDisplay();
    } else if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput !== '') {
            firstOperand = currentInput;
            currentInput = '';
            operator = value;
            updateDisplay();
        }
    } else if (value === '=') {
        if (firstOperand !== '' && currentInput !== '' && operator !== '') {
            try {
                loading.classList.remove('hidden');
                const result = await performCalculation(parseFloat(firstOperand), parseFloat(currentInput), operator);
                currentInput = result.toString();
                firstOperand = '';
                operator = '';
                updateDisplay();
            } catch (error) {
                display.value = 'Error';
            } finally {
                loading.classList.add('hidden');
            }
        }
    } else if (value === 'Clear') {
        clear();
    }
}

function updateDisplay() {
    display.value = currentInput;
}

function clear() {
    currentInput = '';
    firstOperand = '';
    operator = '';
    updateDisplay();
}

async function performCalculation(a, b, op) {
    switch (op) {
        case '+':
            return await backend.add(a, b);
        case '-':
            return await backend.subtract(a, b);
        case '*':
            return await backend.multiply(a, b);
        case '/':
            if (b === 0) throw new Error('Division by zero');
            return await backend.divide(a, b);
        default:
            throw new Error('Invalid operator');
    }
}

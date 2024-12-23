// Global history array
let history = [];

// Append value to the display (called by all the buttons)
function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

// Clear the display
function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

// Backspace: remove the last character
function backspace() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// Calculate result, handle special operations like sqrt, factorial, etc.
function calculateResult() {
    const display = document.getElementById('display');
    let expression = display.value;

    try {
        // Handle special cases: Replace symbols with their JavaScript equivalents
        expression = expression.replace('√', 'Math.sqrt'); // Square root
        expression = expression.replace('%', '/100'); // Percentage
        expression = expression.replace('^', '**'); // Exponentiation
        expression = expression.replace('π', Math.PI); // Pi

        // Evaluate the expression
        const result = eval(expression);

        // Handle factorial (e.g., 5! = 120)
        if (expression.includes('!')) {
            const num = parseInt(display.value.replace('!', ''));
            if (num >= 0) {
                display.value = factorial(num);
            }
        } else {
            display.value = result;
        }

        // Add result to history
        addToHistory(display.value);

    } catch (error) {
        display.value = 'Error';
    }
}

// Add result to history (keep last 5 results)
function addToHistory(result) {
    history.push(result);
    if (history.length > 5) {
        history.shift(); // Keep only the last 5 results
    }
    updateHistoryDisplay();
}

// Update the history modal
function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Clear previous history

    history.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        historyList.appendChild(listItem);
    });
}

// Show the history modal
function showHistory() {
    const historyModal = document.getElementById('historyModal');
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Clear previous history

    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });

    historyModal.style.display = 'block'; // Show the modal
}

// Close the history modal
function closeHistory() {
    const historyModal = document.getElementById('historyModal');
    historyModal.style.display = 'none'; // Hide the modal
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const historyModal = document.getElementById('historyModal');
    if (event.target === historyModal) {
        historyModal.style.display = 'none';
    }
}

// Factorial function (e.g., 5! = 120)
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const display = document.getElementById('display');
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '.' || key === '(' || key === ')') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        backspace();
    }
});

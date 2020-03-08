function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const operators = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }

    const splittedArray = expr.split(' ');
    const array = [];

    for (let i = 0; i < splittedArray.length; i++) {
        if (splittedArray[i] !== '') {
            array.push(splittedArray[i])
        }
    }

    const reformArray = array.map((el) => {
        if (Number.isNaN(Number(el))) {
            return el
        }
        return Number(el);
    })

    const symbols = [];
    const nums = [];

    const calc = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => {
            if (b == 0) throw new Error('TypeError: Division by zero.');
            return a / b;
        },
        '(': (a, b) => (a, b)
    }

    for (let i = 0; i <= reformArray.length; i++) {
        let lastSymbols = symbols.slice(symbols.length - 1);
        if (!isNaN(Number(reformArray[i]))) {
            nums.push(reformArray[i])
        } else {
            if (reformArray[i] == '(') {
                symbols.push(reformArray[i])
            } else if (lastSymbols == '(' && reformArray[i] != ')') {
                symbols.push(reformArray[i])
            } else if (symbols.length == 0 || operators[symbols.slice(symbols.length - 1, symbols.length)] < operators[reformArray[i]]) {
                symbols.push(reformArray[i])
            } else if (reformArray[i] == ')') {
                if (lastSymbols == '(') {
                    symbols.pop();
                    continue;
                }
                let lastNums = [];
                lastNums.push(nums.pop(), nums.pop());
                lastNums = calc[lastSymbols](lastNums[1], lastNums[0]);
                nums.push(lastNums);
                symbols.pop();
                i--;
            } else {
                let lastNums = [];
                let currentSymbols = symbols.pop();
                lastNums.push(nums.pop(), nums.pop())
                lastNums = calc[currentSymbols](lastNums[1], lastNums[0]);
                nums.push(lastNums);
                i--;
            }
        }
    }
    if (symbols[0] != '(') return nums[0];

}


module.exports = {
    expressionCalculator
}
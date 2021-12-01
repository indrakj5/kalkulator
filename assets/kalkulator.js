const calculator = {
    displayNumber:  '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    if(calculator.displayNumber === '0'){
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        //mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan')
    }
}

function defaultNumber(){
    calculator.firstNumber = '0';
}

function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else if (calculator.operator === "-"){
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    } else if (calculator.operator === "*"){
        result = parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber);
    } else if (calculator.operator === "/"){
        result = parseInt(calculator.firstNumber) / parseInt(calculator.displayNumber);
    } else if (calculator.operator === "%"){
        result = parseInt(calculator.firstNumber) % parseInt(calculator.displayNumber);
    }

    calculator.displayNumber = result;

}

function power(){
    if (document.querySelector("#displayNumber").innerText === '') {
        document.querySelector("#displayNumber").innerText = '0'
    } else {
        document.querySelector("#displayNumber").innerText = ''
    }
     
} 

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function (event) {
        //mendapatkan objek elemen yang diklik
        const target = event.target;

        if(target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if(target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            clearCalculator();
            defaultNumber();
            return;
        }

        if(target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay()
    });
}
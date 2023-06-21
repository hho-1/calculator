let displayTop = document.querySelector(".display-top")
let displayBottom = document.querySelector(".display-bottom")
const buttonsContainer = document.querySelector(".buttons-container")

let operator = ""
let firstNumber = ""
let isPreviousOperator = false




buttonsContainer.addEventListener('click', (e) => {
    if(!e.target.classList.contains("button")) return;

    let primaryValue = displayBottom.innerHTML
    let buttonValue = e.target.innerHTML
    

    if(e.target.classList.contains("ac")){
        operator = ""
        displayBottom.innerHTML ="0"
        displayTop.innerHTML = ""
        firstNumber = ""
    }

    if(e.target.classList.contains("number")){
        
        if(primaryValue.length < 11){
            if(primaryValue !== "0"){
                displayBottom.innerHTML += buttonValue
            }
            else if(buttonValue !== "0"){
                displayBottom.innerHTML = buttonValue
            }
        }
    }

    if(e.target.classList.contains("pm")){
        if(primaryValue[0] === "-"){
            displayBottom.innerHTML = primaryValue.substring(1)
        }
        else if(primaryValue.length < 11 && primaryValue !== 0){
            displayBottom.innerHTML = "-"+primaryValue
        }
    }

    if(e.target.classList.contains("decimal")){
        if(!primaryValue.includes(".")){
            displayBottom.innerHTML += "."
        }
    }

    function calculate (operator){
        switch(operator){
            case "+":
                return Number(firstNumber) + Number(displayBottom.innerHTML);
            case "-":
                return Number(firstNumber) - Number(displayBottom.innerHTML);
            case "÷":
                return (Number(firstNumber) / Number(displayBottom.innerHTML)).toFixed(5);
            case "x":
                return Number(firstNumber) * Number(displayBottom.innerHTML);
        }
    }

    if(e.target.classList.contains("operator")){
        if(!isPreviousOperator){
            if(displayTop.innerHTML && operator){
                firstNumber = calculate(operator)
                
            }
            else{
                firstNumber = primaryValue
            }
            displayBottom.innerHTML = "0"
        }
        
        operator = buttonValue
        displayTop.innerHTML = firstNumber + operator
        isPreviousOperator = true
    }
    else{
        isPreviousOperator = false
    }

    if(e.target.classList.contains("equal")){
        firstNumber = calculate(operator)

        if(toString(firstNumber).length > 10){
            
            displayTop.innerHTML = firstNumber.toExponential()
        }
        else{
            displayTop.innerHTML = firstNumber
        }
        
        displayBottom.innerHTML = "0"
        operator = ""
        isPreviousOperator = true
    }


    

})


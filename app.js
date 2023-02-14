const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const clean = document.querySelector('.clean')
const del = document.querySelector('.delete')
const equality = document.querySelector('.equality')
const previousResult = document.querySelector('.previous-result')
const currentResult = document.querySelector('.current-result')

let currentAction = ''
let previousAction = ''
let actions = undefined

const cal = () => {
    let action 
    if(!previousAction || !currentAction) {
        return
    }
    const previous = parseFloat(previousAction)
    const current = parseFloat(currentAction)

    if(isNaN(previous) || isNaN(current)) {
        return
    }

    switch (actions) {
        case '+':
            action = previous + current
            break;
        case '-':
            action = previous - current
            break;
        case '×':
            action = previous * current
            break;
        case '÷':
            if(current === 0) {
                allClean()
                return
            }
            action = previous / current
            break;
        case '√':
            action = Math.pow(previous, 1/current)
            break;
        case '%':
            action = previous / 100 * current
            break;
        case '^':
            action = Math.pow(previous, current)
            break;
        case 'log':
            action = Math.log(previous) / Math.log(current)
            break;
        default:
            return
    }
    currentAction = action
    actions = undefined
    previousAction = ''

}

const chooseActions = (operator) => {
    if(currentAction === '') {
        return
    }
    if(previousAction !== '') {
        const previous = previousResult.innerText
        if(currentAction.toString() === '0' && previous[previous.length - 1] === '÷') {
            allClean()
            return
        }
        cal()
    }

    actions = operator
    previousAction = currentAction
    currentAction = ''
}

const actualizeResult = () => {
    currentResult.innerText = currentAction

    if(actions != null) {
        previousResult.innerText = previousAction + actions
    } else {
        previousResult.innerText = ''
    }
}

const addNumber = (number) => {
    if(number === '•') {
        if(currentAction.includes('.')) {
            return
        }
        number = '.'
    }
    currentAction = currentAction.toString() + number.toString()
}

const delNumber = () => {
    currentAction = currentAction.toString().slice(0, -1)
}

const allClean = () => {
    currentAction = ''
    previousAction = ''
    actions = undefined
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText)
        actualizeResult()
    })
})

del.addEventListener('click', () => {
    delNumber()
    actualizeResult()
})

clean.addEventListener('click', () => {
    allClean()
    actualizeResult()
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        chooseActions(operator.innerText)
        actualizeResult()
    })
})

equality.addEventListener('click', () => {
    cal()
    actualizeResult()
})
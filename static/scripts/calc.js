"use strict"



function evaluateString(string) {
    var not = get_notation(string)
    var res = evaluate(not)

    return res
}

function get_notation(token) {
    var prec = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2, '(': 0, ')': 0 }
    var assoc = { '+': false, '-': false, '*': false, '/': false, '%': false, '(': true, ')': true }
    var oper_stack = []
    var output_queue = []

    for (let ind = 0; ind < token.length; ind++) {
        if ("0123456789,".includes(token[ind])) {
            let flag = ind;
            let next = "";
            while (flag < token.length && "0123456789,".includes(token[flag])) {
                next += token[flag];
                flag++;
            }
            ind = --flag;
            output_queue.push(next);
        }
        else if ("+=-*/%".includes(token[ind])) {
            while (oper_stack.length > 0
                && ((fInD(prec, oper_stack[oper_stack.length - 1]) >= fInD(prec, token[ind])
                    && !fInD(assoc, token[ind]))
                    || (fInD(prec, oper_stack[oper_stack.length - 1]) > fInD(prec, token[ind])
                        && fInD(assoc, token[ind])))) {
                output_queue.push(oper_stack.pop());
            }

            oper_stack.push(token[ind]);
        }
        else if (token[ind] == '(') {
            oper_stack.push(token[ind]);
        }
        else if (token[ind] == ')') {
            while (oper_stack.length > 0 && oper_stack[oper_stack.length - 1] != '(') {
                output_queue.push(oper_stack.pop());
            }
            if (oper_stack.length > 0) {
                oper_stack.pop();
            }
        }
        else {
            console.log("What")
            return
        }
    }

    while (oper_stack.length > 0) {
        output_queue.push(oper_stack.pop());
    }

    return output_queue
}

function fInD(dict, key) {
    for (var keys in dict) {
        if (key == keys) {
            return dict[keys]
        }
    }
}

function evaluate(notation_queue) {
    var stack = []

    for (let ind = 0; ind < notation_queue.length; ind++) {
        if ("+=-*/%".includes(notation_queue[ind])) {
            var number1 = stack.pop();
            var number2 = stack.pop();
            stack.push(operate(notation_queue[ind], number1, number2));
        }
        else {
            stack.push(notation_queue[ind])
        }
    }

    return stack.pop()
}

function operate(operation, number1, number2) {
    switch (operation) {
        case '+':
            return parseFloat(number1) + parseFloat(number2)
        case '-':
            return parseFloat(number2) - parseFloat(number1)
        case '*':
            return parseFloat(number1) * parseFloat(number2)
        case '/':
            return parseFloat(number2) / parseFloat(number2)
        case '%':
            return parseFloat(number2) % parseFloat(number1)
    }
}
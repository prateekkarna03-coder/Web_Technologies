function calculate(operation) {

    let n1 = Number(document.getElementById("num1").value);
    let n2 = Number(document.getElementById("num2").value);

    let result;

    if (operation == 'add') {
        result = n1 + n2;
    }
    else if (operation == 'sub') {
        result = n1 - n2;
    }
    else if (operation == 'mul') {
        result = n1 * n2;
    }
    else if (operation == 'div') {
        if (n2 == 0) {
            result = "Cannot Divided By 0";
        }
        else {
            result = n1 / n2;
        }
    }

    document.getElementById("result").innerText = result;


}

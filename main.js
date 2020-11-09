function probZiroState(n, p, m) {
    // n - Количество каналов
    // p - Суммарная нагрузка
    // m - Объем накопителя

    let P_0 = 0; // Вероятность нулевого состояния

    function factorial(n) { // Функция, вычисляющая фактариал
        let fact;

        if(n == 0 || n == 1) {
            fact = 1;
        } 
        else {
            fact = parseInt(n);
            for(var i = 1; i < n; i++) {
                fact *= i;
            }
        }
        return fact;
    }

    // --- Формула расчета ---
    for (let i = 0; i <= n; i++) {
        P_0 += Math.pow(p, i)/factorial(i);
    }
    P_0 += ( Math.pow(p, n) / factorial(n) ) * ( (p/n - Math.pow(p/n, (m + 1))) / (1 - p/n));
    P_0 = Math.pow(P_0, -1);
    // --- Формула расчета ---

    // Обработка исключения: деления на ноль
    if (isNaN(P_0)) {
        P_0 = "Деление на ноль";
    }

    return(P_0);
}

let mRow = [1, 5, 10, 20, 30, 40, 50];
let pRow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function calculate() {
    let nValue = parseInt(document.getElementById("value-n").value, 0); 
    console.log(nValue);

    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 7; j++) {
            document.getElementById(i.toString() + j.toString()).innerHTML = probZiroState(nValue, pRow[i-1], mRow[j-1]);
        }
    }

    //Цикл, который уменьшает дробь до определенного количесва знаков после запятой
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 7; j++) {
            let x = document.getElementById(i.toString() + j.toString()).innerHTML;
            x = parseFloat(x).toExponential(6);

            // Обработка исключения: деления на ноль
            if (isNaN(x)) {
                x = "Деление на ноль";
            }

            document.getElementById(i.toString() + j.toString()).innerHTML = x;
        }
    }

    document.getElementById("pros-n").innerHTML = nValue;
}


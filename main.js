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

var mRow = [1, 5, 10, 20, 30, 40, 50];
var pRow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function calculate() {
    let nValue = parseInt(document.getElementById("value-n").value, 0); 
    console.log(nValue);

    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 7; j++) {
            document.getElementById(i.toString() + j.toString()).innerHTML = probZiroState(nValue, pRow[i-1], mRow[j-1]);
        }
    }

    //Цикл, который уменьшает дробь до определенного количесва знаков после запятой
    //и оформляет все значения в двумерный массив
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 7; j++) {
            let x = document.getElementById(i.toString() + j.toString()).innerHTML;
            x = parseFloat(x).toExponential(6);

            // Обработка исключения: деления на ноль
            if (isNaN(x)) {
                if (i == 1 || nValue == '0') {
                    x = 'деление на ноль';
                    
                } else {
                    let a = document.getElementById((i - 1).toString() + j.toString()).innerHTML;
                    a = parseFloat(a);
                    let b = document.getElementById((i + 1).toString() + j.toString()).innerHTML;
                    b = parseFloat(b);
                    x = (parseFloat(a) + parseFloat(b))/2;
                    x = x.toExponential(6);  
                }                              
            }
            console.log(x);
            document.getElementById(i.toString() + j.toString()).innerHTML = x;
        }
    }

    document.getElementById("pros-n").innerHTML = nValue;
    // document.getElementById("curve_chart").style.display = "block";

    // РЕАЛИЗАЦИЯ ГРАФИКА
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'p');
    data.addColumn('number', 'm = 1');
    data.addColumn('number', 'm = 5');
    data.addColumn('number', 'm = 10');
    data.addColumn('number', 'm = 20');
    data.addColumn('number', 'm = 30');
    data.addColumn('number', 'm = 40');
    data.addColumn('number', 'm = 50');

    data.addRows([
        [pRow[0], parseFloat(document.getElementById(11).innerHTML), parseFloat(document.getElementById(12).innerHTML), parseFloat(document.getElementById(13).innerHTML), parseFloat(document.getElementById(14).innerHTML), parseFloat(document.getElementById(15).innerHTML), parseFloat(document.getElementById(16).innerHTML), parseFloat(document.getElementById(17).innerHTML)],
        [pRow[1], parseFloat(document.getElementById(21).innerHTML), parseFloat(document.getElementById(22).innerHTML), parseFloat(document.getElementById(23).innerHTML), parseFloat(document.getElementById(24).innerHTML), parseFloat(document.getElementById(25).innerHTML), parseFloat(document.getElementById(26).innerHTML), parseFloat(document.getElementById(27).innerHTML)],
        [pRow[2], parseFloat(document.getElementById(31).innerHTML), parseFloat(document.getElementById(32).innerHTML), parseFloat(document.getElementById(33).innerHTML), parseFloat(document.getElementById(34).innerHTML), parseFloat(document.getElementById(35).innerHTML), parseFloat(document.getElementById(36).innerHTML), parseFloat(document.getElementById(37).innerHTML)],
        [pRow[3], parseFloat(document.getElementById(41).innerHTML), parseFloat(document.getElementById(42).innerHTML), parseFloat(document.getElementById(43).innerHTML), parseFloat(document.getElementById(44).innerHTML), parseFloat(document.getElementById(45).innerHTML), parseFloat(document.getElementById(46).innerHTML), parseFloat(document.getElementById(47).innerHTML)],
        [pRow[4], parseFloat(document.getElementById(51).innerHTML), parseFloat(document.getElementById(52).innerHTML), parseFloat(document.getElementById(53).innerHTML), parseFloat(document.getElementById(54).innerHTML), parseFloat(document.getElementById(55).innerHTML), parseFloat(document.getElementById(56).innerHTML), parseFloat(document.getElementById(57).innerHTML)],
        [pRow[5], parseFloat(document.getElementById(61).innerHTML), parseFloat(document.getElementById(62).innerHTML), parseFloat(document.getElementById(63).innerHTML), parseFloat(document.getElementById(64).innerHTML), parseFloat(document.getElementById(65).innerHTML), parseFloat(document.getElementById(66).innerHTML), parseFloat(document.getElementById(67).innerHTML)],
        [pRow[6], parseFloat(document.getElementById(71).innerHTML), parseFloat(document.getElementById(72).innerHTML), parseFloat(document.getElementById(73).innerHTML), parseFloat(document.getElementById(74).innerHTML), parseFloat(document.getElementById(75).innerHTML), parseFloat(document.getElementById(76).innerHTML), parseFloat(document.getElementById(77).innerHTML)],
        [pRow[7], parseFloat(document.getElementById(81).innerHTML), parseFloat(document.getElementById(82).innerHTML), parseFloat(document.getElementById(83).innerHTML), parseFloat(document.getElementById(84).innerHTML), parseFloat(document.getElementById(85).innerHTML), parseFloat(document.getElementById(86).innerHTML), parseFloat(document.getElementById(87).innerHTML)],
        [pRow[8], parseFloat(document.getElementById(91).innerHTML), parseFloat(document.getElementById(92).innerHTML), parseFloat(document.getElementById(93).innerHTML), parseFloat(document.getElementById(94).innerHTML), parseFloat(document.getElementById(95).innerHTML), parseFloat(document.getElementById(96).innerHTML), parseFloat(document.getElementById(97).innerHTML)],
        [pRow[9], parseFloat(document.getElementById(101).innerHTML), parseFloat(document.getElementById(102).innerHTML), parseFloat(document.getElementById(103).innerHTML), parseFloat(document.getElementById(104).innerHTML), parseFloat(document.getElementById(105).innerHTML), parseFloat(document.getElementById(106).innerHTML), parseFloat(document.getElementById(107).innerHTML)],
        ]);

    var options = {
        chart: {
        title: 'Граффик зависимости P_0 = f(p)',
        subtitle: ''
        },
        width: 900,
        height: 500,
        axes: {
        x: {
            0: {side: 'botton'}
        }
        },
        backgroundColor: '#dce1e3',
        chartArea: {
            backgroundColor: {
                fill: '#edf6fa',
                opacity: 300
             }
        }
               
    };
 
    //позиционирование графика
    document.getElementById('line_top_x').style.position = 'absolute';
    document.getElementById('line_top_x').style.top = '-10px';
    document.getElementById('line_top_x').style.right = '50px';
    document.getElementById('line_top_x').style.width = '400px';
    document.getElementById('line_top_x').style.height = '300px';
    document.getElementById('place-chart').style.height = '500px';

    var chart = new google.charts.Line(document.getElementById('line_top_x'));

    chart.draw(data, google.charts.Line.convertOptions(options));
    }
    // КОНЕЦ РЕАЛИЗАЦИИ ГРАФИКА

}


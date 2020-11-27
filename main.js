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

function probZiroState(n, p, m) {
    // n - Количество каналов
    // p - Суммарная нагрузка
    // m - Объем накопителя

    let P_0 = 0; // Вероятность нулевого состояния

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

function probRefuse(n, p, m) {
    let x = Math.pow(p, (n + m))/(Math.pow(n, m) * factorial(n));
    return x * probZiroState(n, p, m);
}

var mRow = [1, 5, 10, 20, 30, 40, 50];
var pRow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function calculate() {
    let nValue = parseInt(document.getElementById("value-n").value, 0); 

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
                if (i == 1 || nValue == '0' || nValue == '10') {
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
            document.getElementById(i.toString() + j.toString()).innerHTML = x;
        }
    }

    let nSet = document.querySelectorAll(".pros-n");
    for (let i = 0; i < nSet.length; i++) {
        nSet[i].innerHTML = nValue;
    }
    // document.getElementById("curve_chart").style.display = "block";

    // РЕАЛИЗАЦИЯ ГРАФИКА
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drowChartZero);

    function drowChartZero() {

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
        document.getElementById("line_top_zero").style.position = 'absolute';
        document.getElementById("line_top_zero").style.top = '-10px';
        document.getElementById("line_top_zero").style.right = '50px';
        document.getElementById("line_top_zero").style.width = '400px';
        document.getElementById("line_top_zero").style.height = '300px';
        document.getElementById('place-chart-zero').style.height = '500px';

        var chart = new google.charts.Line(document.getElementById('line_top_zero'));

        chart.draw(data, google.charts.Line.convertOptions(options));
    }
    // КОНЕЦ РЕАЛИЗАЦИИ ГРАФИКА

    let table = document.querySelector('#table-refuse');

    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 7; j++) {
            let cell = table.rows[i].cells[j];
            cell.innerHTML = probRefuse(nValue, pRow[i - 1], mRow[j - 1]);            
        }
    }

    
    //Цикл, который уменьшает дробь до определенного количесва знаков после запятой
    //и оформляет все значения в двумерный массив
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 7; j++) {
            let x = table.rows[i].cells[j].innerHTML;
            x = parseFloat(x).toExponential(6);

            // Обработка исключения: деления на ноль
            if (isNaN(x)) {
                if (i == 1 || nValue == '0' || nValue == '10') {
                    x = 'деление на ноль';
                    
                } else {
                    let a = table.rows[i - 1].cells[j].innerHTML;
                    a = parseFloat(a);
                    let b = table.rows[i + 1].cells[j].innerHTML;
                    b = parseFloat(b);
                    x = (parseFloat(a) + parseFloat(b))/2;
                    x = x.toExponential(6);  
                }                              
            }
            table.rows[i].cells[j].innerHTML = x;
        }
    }

    // Реализация графика для таблицы вероятностей отказов
    google.charts.setOnLoadCallback(drowChartRefuse);

    function drowChartRefuse() {

        var data = new google.visualization.DataTable();
        data.addColumn('number', 'p');
        data.addColumn('number', 'm = 1');
        data.addColumn('number', 'm = 5');
        data.addColumn('number', 'm = 10');
        data.addColumn('number', 'm = 20');
        data.addColumn('number', 'm = 30');
        data.addColumn('number', 'm = 40');
        data.addColumn('number', 'm = 50');

        let table = document.querySelector('#table-refuse');

        data.addRows([
            [pRow[0], parseFloat(table.rows[1].cells[1].innerHTML), parseFloat(table.rows[1].cells[2].innerHTML), parseFloat(table.rows[1].cells[3].innerHTML), parseFloat(table.rows[1].cells[4].innerHTML), parseFloat(table.rows[1].cells[5].innerHTML), parseFloat(table.rows[1].cells[6].innerHTML), parseFloat(table.rows[1].cells[7].innerHTML)],
            [pRow[1], parseFloat(table.rows[2].cells[1].innerHTML), parseFloat(table.rows[2].cells[2].innerHTML), parseFloat(table.rows[2].cells[3].innerHTML), parseFloat(table.rows[2].cells[4].innerHTML), parseFloat(table.rows[2].cells[5].innerHTML), parseFloat(table.rows[2].cells[6].innerHTML), parseFloat(table.rows[2].cells[7].innerHTML)],
            [pRow[2], parseFloat(table.rows[3].cells[1].innerHTML), parseFloat(table.rows[3].cells[2].innerHTML), parseFloat(table.rows[3].cells[3].innerHTML), parseFloat(table.rows[3].cells[4].innerHTML), parseFloat(table.rows[3].cells[5].innerHTML), parseFloat(table.rows[3].cells[6].innerHTML), parseFloat(table.rows[3].cells[7].innerHTML)],
            [pRow[3], parseFloat(table.rows[4].cells[1].innerHTML), parseFloat(table.rows[4].cells[2].innerHTML), parseFloat(table.rows[4].cells[3].innerHTML), parseFloat(table.rows[4].cells[4].innerHTML), parseFloat(table.rows[4].cells[5].innerHTML), parseFloat(table.rows[4].cells[6].innerHTML), parseFloat(table.rows[4].cells[7].innerHTML)],
            [pRow[4], parseFloat(table.rows[5].cells[1].innerHTML), parseFloat(table.rows[5].cells[2].innerHTML), parseFloat(table.rows[5].cells[3].innerHTML), parseFloat(table.rows[5].cells[4].innerHTML), parseFloat(table.rows[5].cells[5].innerHTML), parseFloat(table.rows[5].cells[6].innerHTML), parseFloat(table.rows[5].cells[7].innerHTML)],
            [pRow[5], parseFloat(table.rows[6].cells[1].innerHTML), parseFloat(table.rows[6].cells[2].innerHTML), parseFloat(table.rows[6].cells[3].innerHTML), parseFloat(table.rows[6].cells[4].innerHTML), parseFloat(table.rows[6].cells[5].innerHTML), parseFloat(table.rows[6].cells[6].innerHTML), parseFloat(table.rows[6].cells[7].innerHTML)],
            [pRow[6], parseFloat(table.rows[7].cells[1].innerHTML), parseFloat(table.rows[7].cells[2].innerHTML), parseFloat(table.rows[7].cells[3].innerHTML), parseFloat(table.rows[7].cells[4].innerHTML), parseFloat(table.rows[7].cells[5].innerHTML), parseFloat(table.rows[7].cells[6].innerHTML), parseFloat(table.rows[7].cells[7].innerHTML)],
            [pRow[7], parseFloat(table.rows[8].cells[1].innerHTML), parseFloat(table.rows[8].cells[2].innerHTML), parseFloat(table.rows[8].cells[3].innerHTML), parseFloat(table.rows[8].cells[4].innerHTML), parseFloat(table.rows[8].cells[5].innerHTML), parseFloat(table.rows[8].cells[6].innerHTML), parseFloat(table.rows[8].cells[7].innerHTML)],
            [pRow[8], parseFloat(table.rows[9].cells[1].innerHTML), parseFloat(table.rows[9].cells[2].innerHTML), parseFloat(table.rows[9].cells[3].innerHTML), parseFloat(table.rows[9].cells[4].innerHTML), parseFloat(table.rows[9].cells[5].innerHTML), parseFloat(table.rows[9].cells[6].innerHTML), parseFloat(table.rows[9].cells[7].innerHTML)],
            [pRow[9], parseFloat(table.rows[10].cells[1].innerHTML), parseFloat(table.rows[10].cells[2].innerHTML), parseFloat(table.rows[10].cells[3].innerHTML), parseFloat(table.rows[10].cells[4].innerHTML), parseFloat(table.rows[10].cells[5].innerHTML), parseFloat(table.rows[10].cells[6].innerHTML), parseFloat(table.rows[10].cells[7].innerHTML)],
            ]);

        var options = {
            chart: {
            title: 'Граффик зависимости P_отк = f(p)',
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
        document.getElementById("line_top_refuse").style.position = 'absolute';
        document.getElementById("line_top_refuse").style.top = '-10px';
        document.getElementById("line_top_refuse").style.right = '50px';
        document.getElementById("line_top_refuse").style.width = '400px';
        document.getElementById("line_top_refuse").style.height = '300px';
        document.getElementById('place-chart-refuse').style.height = '500px';

        var chart = new google.charts.Line(document.getElementById('line_top_refuse'));

        chart.draw(data, google.charts.Line.convertOptions(options));
    }

}
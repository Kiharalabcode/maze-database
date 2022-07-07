function read_maze_csv(dataPath) {
    const request = new XMLHttpRequest(); // HTTPでファイルを読み込む
    request.addEventListener('load', (event) => { // ロードさせ実行
        const response = event.target.responseText; // 受け取ったテキストを返す
        show_maze_param(response); //csv_arrayの関数を実行
        show_maze_graph(response);
    });
    request.open('GET', dataPath, true); // csvのパスを指定
    request.send();
}

function show_maze_param(data) {
    var url = new URL(window.location.href);
    var params = url.searchParams;
    var code = params.get('code');

    const dataArray = [];
    const dataString = data.split('\n');
    for (let i = 0; i < dataString.length; i++) {
        dataArray[i] = dataString[i].split(',');
    }
    for (let j = 1; j < dataArray[code].length; j++) {
        maze_param_div.innerHTML += dataArray[0][j] + ":" + dataArray[code][j] + "<br>"; //表示
    };
}

function read_maze_text_data(dataPath) {
    const request = new XMLHttpRequest(); // HTTPでファイルを読み込む

    request.addEventListener('load', (event) => { // ロードさせ実行
        const response = event.target.responseText; // 受け取ったテキストを返す
        show_maze_text(response); //csv_arrayの関数を実行
    });
    request.open('GET', dataPath, true); // csvのパスを指定
    request.send();
}

function show_maze_text(data) {
    maze_text_div.innerHTML = "<h4> maze data stings </h4>"
    const dataString = data.split('\n'); //改行で分割
    console.log(dataString);
    for (let i = 0; i < dataString.length; i++) { //あるだけループ
        maze_text_div.innerHTML += dataString[i] + "<br>";
    }
}

function show_maze_image(num) {
    var bd_div = document.getElementById("bd");

    var newimg = document.createElement("img");
    newimg.src = "./maze_system_imagedata/origin_maze/origin_maze_" + num + ".png";
    newimg.width = 300;
    newimg.height = 300;
    bd_div.appendChild(newimg);

    var newimg = document.createElement("img");
    newimg.src = "./maze_system_imagedata/origin_maze_correctpath/origin_maze_correctpath_" + num + ".png";
    newimg.width = 300;
    newimg.height = 300;
    bd_div.appendChild(newimg);

    var newimg = document.createElement("img");
    newimg.src = "./maze_system_imagedata/origin_maze_color/origin_maze_color_" + num + ".png";
    newimg.width = 300;
    newimg.height = 300;
    bd_div.appendChild(newimg);

    var newimg = document.createElement("img");
    newimg.src = "./maze_system_imagedata/thin_wall_maze/thin_wall_maze_" + num + ".png";
    newimg.width = 300;
    newimg.height = 300;
    bd_div.appendChild(newimg);
    /*
    var newimg = document.createElement("img");
    newimg.src = "./maze_system_imagedata/red_arrow_maze/red_arrow_maze_" + num + ".png";
    newimg.width = 300;
    newimg.height = 300;
    bd_div.appendChild(newimg);

    var newimg = document.createElement("img");
    newimg.src = "./maze_system_imagedata/idea_maze/idea_maze_" + num + ".png";
    newimg.width = 300;
    newimg.height = 300;
    bd_div.appendChild(newimg);

    var newimg = document.createElement("img");
    newimg.src = "./maze_system_imagedata/himohari_idea_maze/himohari_idea_maze_" + num + ".png";
    newimg.width = 300;
    newimg.height = 300;
    bd_div.appendChild(newimg);
*/
    //var newimg = document.createElement("img");
    //newimg.src = "./maze_system_imagedata/tree_graph/tree_graph_" + num + ".png";
    // newimg.width=280;
    // newimg.height=300;
    //bd_div.appendChild(newimg);
}

function show_maze_graph(data) {
    const maze_graph_div = document.getElementById("maze_graph")

    var url = new URL(window.location.href);
    var params = url.searchParams;
    var code = params.get('code');

    const dataArray = [];
    const dataString = data.split('\n');
    for (let i = 0; i < dataString.length; i++) {
        if (i == 0) {
            dataColumns = dataString[i].split(",");
        }
        else {
            dataArray[i] = dataString[i].split(',');
        }
    }
    console.log(dataColumns);

    for (var k = 2; k < dataColumns.length; k++) {
        var graph_div = document.createElement("div")
        graph_div.classList.add("graph")
        var graph_canvas = document.createElement("canvas")
        graph_canvas.id = dataColumns[k]+"_canvas"
        graph_div.appendChild(graph_canvas)
        maze_graph_div.appendChild(graph_div)

        var count = {};
        arr = dataArray.map(row => parseInt(Number(row[k]))).filter(v => v)
        for (var i = 0; i < arr.length; i++) {
            count[arr[i]] = (count[arr[i]] || 0) + 1;
        }
        console.log(count);

        backgroundcolors = []
        for (var i = 0; i < Object.keys(count).length; i++){
            if (arr[code-1] == Number(Object.keys(count)[i])){
                backgroundcolors[i] = "rgba(255,0,0,0.7)"
            }
            else {
                backgroundcolors[i] = "rgba(71,71,71,0.7)"
            }
        }
        console.log(backgroundcolors)

        var data = {
            labels: Object.keys(count), // the #4 being a string is the only difference
            datasets: [{
                label: dataColumns[k],
                backgroundColor: backgroundcolors,
                barPercentage: 1,
                categoryPercentage: 1,
                data: Object.values(count),
                xAxisID: "xA"
            }
            ]
        };

        var options = {
            scales: {
                xA: {
                    display: false
                },
                x: {
                    display: true,
                    grid: {
                        offset: false
                    }
                },
                y: {
                    ticks: {
                        beginAtZero: true
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: dataColumns[k]
                }
            }
        };

        new Chart(graph_canvas, {
            type: 'bar',
            data: data,
            options: options
        });
    }
}

const maze_param_div = document.getElementById('maze_param');
const maze_text_div = document.getElementById('maze_text');

var url = new URL(window.location.href);
var params = url.searchParams;
var num = params.get('num');
var code = params.get('code');

read_maze_csv("./MasterMazeData_features_df_17.csv")
read_maze_text_data("./maze_data/" + num + '.txt')

var mt = document.getElementById("maze_title");
var maze_name = document.createElement("h2");
maze_name.innerHTML = "MAZE " + num;
mt.appendChild(maze_name);

show_maze_image(num)
function readCsvToDict(csvPath) {
    var csv_dict_list = []

    const request = new XMLHttpRequest();
	request.open('GET', csvPath, false);
	request.send(null);

    var csvData = request.responseText

    var lines = csvData.split("\n");
 
    for (var i = 0; i < lines.length-1; i++) {
        if (i == 0){
            var column_names = lines[i].split(",").slice(1)
        }
        else {
            var csv_dict = {}
            for (var j = 0; j < column_names.length; j++){
                csv_dict[column_names[j]] = lines[i].split(",")[j+1]
            }
            csv_dict_list.push(csv_dict)
        }
    }
    return csv_dict_list
}

function getURLParam(){
    let url = new URL(window.location.href);
    let params = url.searchParams;

    return params.get("uniquename")
}

function getMazeData(unique_name, maze_data_dict_list, maze_feature_dict_list){
    for(var i = 0; i < maze_data_dict_list.length; i++) {
        if(maze_data_dict_list[i]["_base64_name_"] == unique_name) {
            return [maze_data_dict_list[i], maze_feature_dict_list[i]]
        }
    }
}

function showImages(maze_data_dict){
    var image_file_name = "W" +
                          maze_data_dict["W"] +
                          "H" +
                          maze_data_dict["H"] +
                          "S1,1E" +
                          maze_data_dict["endX"] +
                          "," +
                          maze_data_dict["endY"] +
                          "M" +
                          maze_data_dict["_base64_name_"] +
                          ".png"

    document.getElementById("origin_maze").src = "../research_data/maze_images/" +
                                                 maze_data_dict["size"] +
                                                 "/origin_maze/" +
                                                 image_file_name
    document.getElementById("origin_maze_correctpath").src = "../research_data/maze_images/" +
                                                 maze_data_dict["size"] +
                                                 "/origin_maze_correctpath/" +
                                                 image_file_name
    document.getElementById("origin_maze_color").src = "../research_data/maze_images/" +
                                                 maze_data_dict["size"] +
                                                 "/origin_maze_color/" +
                                                 image_file_name
}

function showMazeGraph(size_data, maze_feature_dict) {
    const maze_graph_div = document.getElementById("maze_graph")

    for (key in maze_feature_dict) {
        if (key == "maze_name" || key == "size") continue

        var graph_div = document.createElement("div")
        graph_div.classList.add("graph")

        var graph_canvas = document.createElement("canvas")
        graph_canvas.id = key + "_canvas"

        graph_div.appendChild(graph_canvas)

        maze_graph_div.appendChild(graph_div)

        
        var count = {};
        arr = size_data.map(row => Math.round(Number(row[key]) * 100) / 100)
        for (var i = 0; i < arr.length; i++) {
            count[arr[i]] = (count[arr[i]] || 0) + 1;
        }

        backgroundcolors = []
        for (var i = 0; i < Object.keys(count).length; i++){
            console.log(Object.keys(count)[i])
            if (Object.keys(count)[i] == Math.round(Number(maze_feature_dict[key]) * 100) / 100){
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
                label: key,
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
                    text: key
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

function getSizeData(maze_feature_dict_list, size) {
    size_data_list = []
    for (var i = 0; i < maze_feature_dict_list.length; i++){
        if (maze_feature_dict_list[i]["size"] == size) size_data_list.push(maze_feature_dict_list[i])
    }
    return size_data_list
}

function showFeatureParam(maze_feature_dict){
    for(key in maze_feature_dict){
        elm = document.getElementById(key)
        elm.innerText = maze_feature_dict[key]
    }
}

maze_data_dict_list = readCsvToDict("../research_data/maze_data.csv")
//console.log(maze_data_dict_list)
maze_feature_dict_list = readCsvToDict("../research_data/MasterMazeData_features_df.csv")
//console.log(maze_feature_dict_list)

var unique_name = getURLParam()
document.getElementById("maze_unique_name").innerText = unique_name

var maze_data = getMazeData(unique_name, maze_data_dict_list, maze_feature_dict_list)
var maze_data_dict = maze_data[0]
var maze_feature_dict = maze_data[1]
showImages(maze_data_dict)

showFeatureParam(maze_feature_dict)
showMazeGraph(getSizeData(maze_feature_dict_list, maze_data_dict["size"]), maze_feature_dict)
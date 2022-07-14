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

    document.getElementById("origin_maze").src = "https://kiharalabcode.github.io/maze-database/research_data/maze_images/" +
                                                 maze_data_dict["size"] +
                                                 "/origin_maze/" +
                                                 image_file_name
    document.getElementById("origin_maze_correctpath").src = "https://kiharalabcode.github.io/maze-database/research_data/maze_images/" +
                                                 maze_data_dict["size"] +
                                                 "/origin_maze_correctpath/" +
                                                 image_file_name
    document.getElementById("origin_maze_color").src = "https://kiharalabcode.github.io/maze-database/research_data/maze_images/" +
                                                 maze_data_dict["size"] +
                                                 "/origin_maze_color/" +
                                                 image_file_name
    document.getElementById("thin_wall_maze").src = "https://kiharalabcode.github.io/maze-database/research_data/maze_images/" +
                                                 maze_data_dict["size"] +
                                                 "/thin_wall_maze/" +
                                                 image_file_name
    document.getElementById("tree_graph").src = "https://kiharalabcode.github.io/maze-database/research_data/maze_images/" +
                                                 maze_data_dict["size"] +
                                                 "/tree_graph/" +
                                                 image_file_name
}

function showMazeGraph(size_data, maze_feature_dict) {
    var feature_names = ["straight_num", "T_num", "cross_num", "turn_pos_num", "dead_end_num",
                         "straight_len_log_slope", "straight_len_std",
                         "correct_path_len", "turn_num",
                         "boader_l", "neighbor_sum",
                         "L_num", "L_size", "L_size_std",
                         "R_num", "R_size", "R_size_std",
                         "gorl_depth", "depth_max", "depth_mean", "depth_std"                        
                        ]

    const maze_graph_div = document.getElementById("maze_graph")

    feature_names.forEach(function(key) {
        // if (key == "maze_name" || key == "size") continue

        var graph_div = document.createElement("div")
        graph_div.classList.add("graph")
        graph_div.id = key + "_div"
        graph_div.setAttribute("data-bs-toggle", "modal")
        graph_div.setAttribute("data-bs-target", "#"+key+"_modal")

        var graph_canvas = document.createElement("canvas")
        graph_canvas.id = key + "_canvas"

        graph_div.appendChild(graph_canvas)

        maze_graph_div.appendChild(graph_div)

        
        var count = {};
        arr = size_data.map(row => Math.round(Number(row[key])))
        for (var i = 0; i < arr.length; i++) {
            count[arr[i]] = (count[arr[i]] || 0) + 1;
        }

        backgroundcolors = []
        for (var i = 0; i < Object.keys(count).length; i++){
            if (Object.keys(count)[i] == Math.round(Number(maze_feature_dict[key]))){
                backgroundcolors[i] = "rgba(255,0,0,0.7)"
            }
            else {
                backgroundcolors[i] = "rgba(71,71,71,0.7)"
            }
        }

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
    })
}

function getSizeData(maze_feature_dict_list, size) {
    size_data_list = []
    for (var i = 0; i < maze_feature_dict_list.length; i++){
        if (maze_feature_dict_list[i]["size"] == size) size_data_list.push(maze_feature_dict_list[i])
    }
    return size_data_list
}

function getAlgoData(size_data, algo){
    algo_data_list = []
    for (var i = 0; i < size_data.length; i++){
        if (size_data[i]["maze_name"] == algo) algo_data_list.push(size_data[i])
    }
    return algo_data_list
}

function showFeatureParam(maze_feature_dict){
    for(key in maze_feature_dict){
        elm = document.getElementById(key)
        elm.innerText = maze_feature_dict[key]
    }
}

function showMazeGraphEachAlgo(size_data, maze_feature_dict){
    var feature_max_min_dict = {
        'turn_num': { 'max': 224, 'min': 1, 'digit': 0 },
        'L_num': { 'max': 40, 'min': 0, 'digit': 0 },
        'L_size': { 'max': 1072, 'min': 0, 'digit': 0 },
        'L_size_std': { 'max': 384.035, 'min': 0.0, 'digit': 3 },
        'R_num': { 'max': 41, 'min': 0, 'digit': 0 },
        'R_size': { 'max': 1140, 'min': 0, 'digit': 0 },
        'R_size_std': { 'max': 294.118, 'min': 0.0, 'digit': 3 },
        'boader_l': { 'max': 1311, 'min': 0, 'digit': 0 },
        'neighbor_sum': { 'max': 133, 'min': 0, 'digit': 0 },
        'correct_path_len': { 'max': 705, 'min': 9, 'digit': 0 },
        'turn_pos_num': { 'max': 337, 'min': 0, 'digit': 0 },
        'dead_end_num': { 'max': 235, 'min': 2, 'digit': 0 },
        'T_num': { 'max': 166, 'min': 0, 'digit': 0 },
        'cross_num': { 'max': 51, 'min': 0, 'digit': 0 },
        'straight_len_std': { 'max': 5.195, 'min': 0.0, 'digit': 3 },
        'straight_num': { 'max': 553, 'min': 4, 'digit': 0 },
        'gorl_depth': { 'max': 704, 'min': 8, 'digit': 0 },
        'depth_std': { 'max': 242.339, 'min': 0.0, 'digit': 3 },
        'depth_max': { 'max': 798, 'min': 8, 'digit': 0 },
        'depth_mean': { 'max': 463.86, 'min': 5.2, 'digit': 3 },
        'straight_len_log_slope': { 'max': 0.331, 'min': -0.628, 'digit': 3 }
    }
    var algo_names = ["AldousBroder", "Division", "GrowingTree", "Kruskal", "Prims", "Sidewinder"]
    const algo_maze_graph_div = document.getElementById("algo_maze_graph")

    for (key in maze_feature_dict) {
        if (key == "maze_name" || key == "size") continue

        var modal_div = document.createElement("div")
        modal_div.classList.add("modal")
        modal_div.classList.add("fade")
        modal_div.id = key + "_modal"
        modal_div.setAttribute("tabindex", "-1")
        modal_div.setAttribute("aria-labelledby", key + "_modal_label")
        modal_div.setAttribute("aria-hidden", "true")

        var modal_dialog_div = document.createElement("div")
        modal_dialog_div.classList.add("modal-dialog")

        var modal_content_div = document.createElement("div")
        modal_content_div.classList.add("modal-content")

        var modal_header_div = document.createElement("div")
        modal_header_div.classList.add("modal-header")

        var modal_title_h5 = document.createElement("h5")
        modal_title_h5.classList.add("modal-title")
        modal_title_h5.id = key + "_modal_label"
        modal_title_h5.innerText = key

        var modal_header_button = document.createElement("button")
        modal_header_button.type = "button"
        modal_header_button.classList.add("btn-close")
        modal_header_button.setAttribute("data-bs-dismiss", "modal")
        modal_header_button.setAttribute("aria-label", "Close")

        modal_header_div.appendChild(modal_title_h5)
        modal_header_div.appendChild(modal_header_button)

        modal_content_div.appendChild(modal_header_div)

        var modal_body_div = document.createElement("div")
        modal_body_div.classList.add("modal-body")

        var modal_container_div = document.createElement("div")
        modal_container_div.classList.add("container-fluid")

        var row_div = document.createElement("div")
        row_div.classList.add("row")

        for (var i = 0; i < algo_names.length; i++) {

            var graph_canvas = document.createElement("canvas")
            graph_canvas.id = algo_names[i] + "_" + key + "_canvas"

            row_div.appendChild(graph_canvas)

            var algo_data = getAlgoData(size_data, algo_names[i])

            var count = {};
            arr = algo_data.map(row => Math.round(Number(row[key])))
            for (var j = 0; j < arr.length; j++) {
                count[arr[j]] = (count[arr[j]] || 0) + 1;
            }
            
            if (algo_names[i] == maze_feature_dict["maze_name"]){
                backgroundcolors = []
                for (var j = 0; j < Object.keys(count).length; j++){
                    if (Object.keys(count)[j] == Math.round(Number(maze_feature_dict[key]))){
                        backgroundcolors[j] = "rgba(255,0,0,0.7)"
                    }
                    else {
                        backgroundcolors[j] = "rgba(71,71,71,0.7)"
                    }
                }
            }
            else backgroundcolors = "rgba(71,71,71,0.7)"

            var data = {
                labels: Object.keys(count), // the #4 being a string is the only difference
                datasets: [{
                    label: algo_names[i],
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
                            offset: false,
                            ticks: {
                                max: feature_max_min_dict[key]["max"],
                                min: feature_max_min_dict[key]["min"]
                            }
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
                        text: algo_names[i]
                    }
                }
            };

            new Chart(graph_canvas, {
                type: 'bar',
                data: data,
                options: options
            });
        }

        modal_container_div.appendChild(row_div)
        modal_body_div.appendChild(modal_container_div)
        modal_content_div.appendChild(modal_body_div)
        modal_dialog_div.appendChild(modal_content_div)
        modal_div.appendChild(modal_dialog_div)
        algo_maze_graph_div.appendChild(modal_div)
    }
}

maze_data_dict_list = readCsvToDict("https://raw.githubusercontent.com/Kiharalabcode/maze-database/main/research_data/maze_data.csv")
//console.log(maze_data_dict_list)
maze_feature_dict_list = readCsvToDict("https://raw.githubusercontent.com/Kiharalabcode/maze-database/main/research_data/MasterMazeData_features_df.csv")
//console.log(maze_feature_dict_list)

var unique_name = getURLParam()
document.getElementById("maze_unique_name").innerText = unique_name

var maze_data = getMazeData(unique_name, maze_data_dict_list, maze_feature_dict_list)
var maze_data_dict = maze_data[0]
var maze_feature_dict = maze_data[1]
showImages(maze_data_dict)

var maze_download_a = document.getElementById("maze_download")
var maze_file_name = "W" +
                     maze_data_dict["W"] +
                     "H" +
                     maze_data_dict["H"] +
                     "S1,1E" +
                     maze_data_dict["endX"] +
                     "," +
                     maze_data_dict["endY"] +
                     "M" +
                     maze_data_dict["_base64_name_"] +
                     ".txt"
                      
maze_download_a.setAttribute("href", "./research_data/maze_data/"+maze_feature_dict["size"]+"/"+maze_file_name)
maze_download_a.setAttribute("download", "")

showFeatureParam(maze_feature_dict)
size_data = getSizeData(maze_feature_dict_list, maze_data_dict["size"])
showMazeGraph(size_data, maze_feature_dict)
showMazeGraphEachAlgo(size_data, maze_feature_dict)

var column_names_jp = {
    "1次的な特徴量": ["直線のマス数", "T字路のマス数", "十字路のマス数", "曲がり角のマス数", "行き止まりのマス数"],
    "2次的な特徴量": [/*"直線の長さ",*/ "直線の長さの標準偏差",
                     "正道の経路の長さ", "正道の曲がり角のマス数",
                     "誤道の周辺長", "誤道の隣接数",
                     "L領域の誤道数", "L領域の総経路長", "L領域の経路の標準偏差",
                     "R領域の誤道数", "R領域の総経路長", "R領域の経路の標準偏差",
                    ],
    "3次的な特徴量": ["ゴールまでの深さ", "最大深さ", "深さの平均", "深さの標準偏差"],
}
var column_names_en = {
    "1次的な特徴量": ["straight_num", "T_num", "cross_num", "turn_pos_num", "dead_end_num"],
    "2次的な特徴量": [/*"straight_len_log_slope",*/ "straight_len_std",
                     "correct_path_len", "turn_num",
                     "boader_l", "neighbor_sum",
                     "L_num", "L_size", "L_size_std",
                     "R_num", "R_size", "R_size_std",
                    ],
    "3次的な特徴量": ["gorl_depth", "depth_max", "depth_mean", "depth_std"],
}

var feature_max_min_dict = {
    'turn_num': {'max': 224, 'min': 1, 'digit': 0},
    'L_num': {'max': 40, 'min': 0, 'digit': 0},
    'L_size': {'max': 1072, 'min': 0, 'digit': 0},
    'L_size_std': {'max': 384.035, 'min': 0.0, 'digit': 3},
    'R_num': {'max': 41, 'min': 0, 'digit': 0},
    'R_size': {'max': 1140, 'min': 0, 'digit': 0},
    'R_size_std': {'max': 294.118, 'min': 0.0, 'digit': 3},
    'boader_l': {'max': 1311, 'min': 0, 'digit': 0},
    'neighbor_sum': {'max': 133, 'min': 0, 'digit': 0},
    'correct_path_len': {'max': 705, 'min': 9, 'digit': 0},
    'turn_pos_num': {'max': 337, 'min': 0, 'digit': 0},
    'dead_end_num': {'max': 235, 'min': 2, 'digit': 0},
    'T_num': {'max': 166, 'min': 0, 'digit': 0},
    'cross_num': {'max': 51, 'min': 0, 'digit': 0},
    'straight_len_std': {'max': 5.195, 'min': 0.0, 'digit': 3},
    'straight_num': {'max': 553, 'min': 4, 'digit': 0},
    'gorl_depth': {'max': 704, 'min': 8, 'digit': 0},
    'depth_std': {'max': 242.339, 'min': 0.0, 'digit': 3},
    'depth_max': {'max': 798, 'min': 8, 'digit': 0},
    'depth_mean': {'max': 463.86, 'min': 5.2, 'digit': 3},
    'straight_len_log_slope': {'max': 0.331, 'min': -0.628, 'digit': 3}
}

function getURLParam(key){
    let url = new URL(window.location.href);
    let params = url.searchParams;

    if (params.has(key)){
        return params.get(key).split(",").map(Number)
    }
    else {
        return [feature_max_min_dict[key]["min"], feature_max_min_dict[key]["max"]]
    }
}

function createSearchBox(){
    search_box_div = document.getElementById("search_box")

    for (var key in column_names_jp){
        feature_category_name_h2 = document.createElement("h2")
        feature_category_name_h2.classList.add("text-center")
        feature_category_name_h2.classList.add("feature_category_name")
        feature_category_name_h2.innerText = key
        search_box_div.appendChild(feature_category_name_h2)

        for (var i in column_names_jp[key]){
            row_div = document.createElement("div")
            row_div.classList.add('row')
            row_div.classList.add("name_slider")
            
            col_name_div = document.createElement("div")
            col_name_div.classList.add("col")
            col_name_div.classList.add("feature_name_div")

            name_p = document.createElement("p")
            name_p.classList.add("feature_name")
            name_p.innerText = column_names_jp[key][i]

            col_slider_div = document.createElement("div")
            // col_slider_div.classList.add("col-8")
            col_slider_div.classList.add("slider_div")

            slider_div = document.createElement("div")
            slider_div.id = "slider"
            
            var _min_max = getURLParam(column_names_en[key][i])
            noUiSlider.create(slider_div, {
                start: [
                    _min_max[0], 
                    _min_max[1]
                ],
                connect: true,
                range: {
                    'min': feature_max_min_dict[column_names_en[key][i]]["min"],
                    'max': feature_max_min_dict[column_names_en[key][i]]["max"]
                },
                tooltips: [
                    wNumb({decimals: feature_max_min_dict[column_names_en[key][i]]["digit"]}),
                    wNumb({decimals: feature_max_min_dict[column_names_en[key][i]]["digit"]}),
                ],
            });

            col_name_div.appendChild(name_p)
            col_slider_div.appendChild(slider_div)

            row_div.appendChild(col_name_div)
            row_div.appendChild(col_slider_div)

            search_box_div.appendChild(row_div)
        }
    }
    search_button = document.createElement("button")
    search_button.type = "button"
    search_button.innerText = "検索"
    search_button.classList.add("search_button")
    search_box_div.appendChild(search_button)
}

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

createSearchBox()
maze_data_dict = readCsvToDict("../research_data/maze_data.csv")
console.log(maze_data_dict)
maze_feature_dict = readCsvToDict("../research_data/MasterMazeData_features_df.csv")
console.log(maze_feature_dict)
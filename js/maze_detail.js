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
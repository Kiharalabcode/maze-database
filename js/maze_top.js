function selectRecommendAlgo() {
    var recommendAlgo = {
        "many": {
            "many": ["Division"],
            "less": ["AldousBroder", "GrowingTree"],
            "no": ["AldousBroder", "GrowingTree", "Division"]
        },
        "less": {
            "many": ["Kruskal", "Prims"],
            "less": ["Sidewinder"],
            "no": ["Kruskal", "Prims", "Sidewinder"]
        },
        "no": {
            "many": ["Division", "Kruskal", "Prims"],
            "less": ["AldousBroder", "GrowingTree", "Sidewinder"],
            "no": ["どちらかの条件を選択してください"]
        }
    }
    var algo_names = ["AldousBroder", "Division", "GrowingTree", "Kruskal", "Prims", "Sidewinder"]

    var turn_num_radio = document.getElementsByName("turn_num_radio")
    var branch_radio = document.getElementsByName("branch_radio")

    for (var i = 0; i < turn_num_radio.length; i++) {
        if (turn_num_radio[i].checked) var turn_num_value = turn_num_radio[i].value
    }
    for (var i = 0; i < branch_radio.length; i++) {
        if (branch_radio[i].checked) var branch_value = branch_radio[i].value
    }

    if (turn_num_value == "no" && branch_value == "no") {
        for (var i = 0; i < algo_names.length; i++) {
            var elm = document.getElementById(algo_names[i])
            elm.style.display = "none"
        }
        var elm = document.getElementById("no_algo")
        elm.style.display = "block"
    } else {
        document.getElementById("no_algo").style.display = "none"
        for (var i = 0; i < algo_names.length; i++) {
            if (recommendAlgo[turn_num_value][branch_value].includes(algo_names[i])) {
                var elm = document.getElementById(algo_names[i])
                elm.style.display = "block"
            } else {
                var elm = document.getElementById(algo_names[i])
                elm.style.display = "none"
            }
        }
    }
}

function searchButtonClick() {
    var baseURL = "https://kiharalabcode.github.io/maze-database/maze_result.html"
    var params_str = "?algo="

    var algo_names_list = ["AldousBroder", "Division", "GrowingTree", "Kruskal", "Prims", "Sidewinder"]
    var selected_algo = []
    for (var i = 0; i < algo_names_list.length; i++) {
        if (document.getElementById(algo_names_list[i]).style.display == "block") {
            selected_algo.push(algo_names_list[i])
        }
    }

    if (selected_algo.length == 0) {
        params_str += algo_names_list.join(",")
        params_str += "&"
    } else {
        params_str += selected_algo.join(",")
        params_str += "&"
    }

    var _min = slider.get()[0]
    var _max = slider.get()[1]
    params_str += "size" + "=" + _min + "," + _max

    console.log(baseURL + params_str)
    window.location.href = baseURL + params_str
}

function detailSearchButtonClick() {
    var baseURL = "https://kiharalabcode.github.io/maze-database/maze_search.html"
    var params_str = "?algo="

    var algo_names_list = ["AldousBroder", "Division", "GrowingTree", "Kruskal", "Prims", "Sidewinder"]
    var selected_algo = []
    for (var i = 0; i < algo_names_list.length; i++) {
        if (document.getElementById(algo_names_list[i]).style.display == "block") {
            selected_algo.push(algo_names_list[i])
        }
    }

    if (selected_algo.length == 0) {
        params_str += algo_names_list.join(",")
        params_str += "&"
    } else {
        params_str += selected_algo.join(",")
        params_str += "&"
    }

    var _min = slider.get()[0]
    var _max = slider.get()[1]
    params_str += "size" + "=" + _min + "," + _max

    console.log(baseURL + params_str)
    window.location.href = baseURL + params_str
}

var size_slider = document.getElementById("slider")
var slider = noUiSlider.create(size_slider, {
    start: [
        7,
        51
    ],
    connect: true,
    range: {
        'min': 7,
        'max': 51
    },
    tooltips: [
        wNumb({ decimals: 0 }),
        wNumb({ decimals: 0 }),
    ],
});

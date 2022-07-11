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
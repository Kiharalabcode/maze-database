function createSlider(){
    var column_names_jp = {
        "1次的な特徴量": ["直線のマス数", "T字路のマス数", "十字路のマス数", "曲がり角のマス数", "行き止まりのマス数"],
        "2次的な特徴量": [/*"直線の長さ"*/, "直線の長さの標準偏差",
                         "正道の経路の長さ", "正道の曲がり角のマス数",
                         "誤道の周辺長", "誤道の隣接数",
                         "L領域の誤道数", "L領域の総経路長", "L領域の経路の標準偏差",
                         "R領域の誤道数", "R領域の総経路長", "R領域の経路の標準偏差",
                        ],
        "3次的な特徴量": ["ゴールまでの深さ", "最大深さ", "深さの平均", "深さの標準偏差"],
    }
    search_box_div = document.getElementById("search_box")

    for (var key in column_names_jp){
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
            col_slider_div.classList.add("col-8")
            col_slider_div.classList.add("slider_div")

            slider_div = document.createElement("div")
            slider_div.id = "slider"

            noUiSlider.create(slider_div, {
                start: [20, 80],
                connect: true,
                range: {
                    'min': 0,
                    'max': 100
                },
                format: {
                    to: function ( value ) {
                      return parseInt(value);
                    },
                    from: function ( value ) {
                      return value;
                    }
                  },
                tooltips: [
                    wNumb({decimals: 0}),
                    true
                ],
            });

            col_name_div.appendChild(name_p)
            col_slider_div.appendChild(slider_div)

            row_div.appendChild(col_name_div)
            row_div.appendChild(col_slider_div)

            search_box_div.appendChild(row_div)
        }
    }
}

createSlider()

function read_data(dataPath) {
    console.log(dataPath);
    const request = new XMLHttpRequest(); // HTTPでファイルを読み込む
    request.addEventListener('load', (event) => { // ロードさせ実行
        const response = event.target.responseText; // 受け取ったテキストを返す
        show_maze_list(response); //csv_arrayの関数を実行
    });
    request.open('GET', dataPath, true); // csvのパスを指定
    request.send();
}

function show_maze_list(data) {
    const dataString = data.split('\n'); //改行で分割
    for (let i = 1; i < dataString.length - 1; i++) {
        var card_div = document.createElement("div");
        card_div.id = "card_div"
        card_div.classList.add("card")
        card_div.classList.add("text-center")
        var image_div = document.createElement("div");
        image_div.id = "image_div";
        var text_div = document.createElement("div");
        text_div.id = "text_div";
        text_div.classList.add("card-body");
        var col_div = document.createElement("div");
        col_div.classList.add("col");

        let base64 = dataString[i].split(',')[1].slice(1) + ',' + dataString[i].split(',')[2] + ',' + dataString[i].split(',')[3].slice(0, -2);
        var new_button = document.createElement('button');
        let url = "maze_detail.html?num=" + base64 + "&code=" + i;
        new_button.onclick = function () {
            console.log(url);
            location.href = url;
        };

        const newimg = document.createElement("img");
        newimg.src = "./maze_system_imagedata/origin_maze_correctpath/origin_maze_correctpath_" + base64 + ".png";
        newimg.width = 300;
        newimg.height = 300;
        newimg.classList.add("card-img-top")
        new_button.appendChild(newimg);
        image_div.appendChild(new_button);

        var h3 = document.createElement('h3');
        h3.innerHTML = base64;
        h3.classList.add("card-title")
        h3.classList.add("fs-5")

        var a = document.createElement("a");
        a.innerHTML = "DOWNLOAD MAZE DATA"
        a.download = "./maze_data/" + base64 + ".txt";
        a.href = "./maze_data/" + base64 + ".txt";
        a.classList.add("card-text")

        text_div.appendChild(h3);
        text_div.appendChild(a);
        card_div.appendChild(image_div);
        card_div.appendChild(text_div);
        col_div.appendChild(card_div);

        bd_div.appendChild(col_div);
    }
}

var bd_div = document.getElementById("bd");
read_data("./name_base64code_taiou.csv")
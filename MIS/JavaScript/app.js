var __main = function () {
    initialForm();

    var data = getData(sourceData);
    initialTable(data);

    var mis = document.getElementById("checkbox-wrapper");
    // 全局监听会干扰表格
    mis.addEventListener("click", function () {
        var data = getData(sourceData);
        initialTable(data);
    })
}

__main();
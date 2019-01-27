var __main = function () {
    // 初始化
    initialForm();
    // 根据表单状态获取数据
    var data = getData(sourceData);
    initialTable(data);
    initialGraph(data);

    var checkWrap = document.getElementById("checkbox-wrapper");
    // 全局监听会干扰表格
    checkWrap.addEventListener("click", function () {
        var data = getData(sourceData);
        initialTable(data);
        initialGraph(data);
    })
}

__main();
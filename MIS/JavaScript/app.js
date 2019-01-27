var __main = function () {
    initialForm();

    var data = getData(sourceData);
    initialTable(data);
    drawMultiLineGraph(data);
    drawMultiBarGraph(data);

    var checkWrap = document.getElementById("checkbox-wrapper");
    // 全局监听会干扰表格
    checkWrap.addEventListener("click", function () {
        var data = getData(sourceData);
        initialTable(data);
        drawMultiLineGraph(data);
        drawMultiBarGraph(data);
    })

    // drawAxis(lineGraphWrapper, 1000);
    // drawAxis(barGraphWrapper, 1000);
}

__main();
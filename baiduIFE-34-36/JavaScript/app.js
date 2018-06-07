//默认状态初始化
renderTable(getData(sourceData));
//事件委托，复选框绑定点击事件
checkboxWrapper.onclick = function (e) {
    var target = e.target;
    // 渲染表格
    renderTable(getData(sourceData));

    // 画多合一图
    var barWrapper = document.getElementById("bar-wrapper");
    var lineWrapper = document.getElementById("line-wrapper");
    var data = getData(sourceData); //获取选中数据
    barWrapper.innerHTML = ""; //重新画图
    lineWrapper.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        // drawBarGraph(data);
        // drawLineGraph(data[i].sale);
        console.log(data[i].sale);
    }

}
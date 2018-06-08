//默认状态初始化
renderTable(getData(sourceData));
graph.drawGraph(sourceData[0]["sale"]); //默认数据画图
graph.setData(); //监听moursehover事件画图

//事件委托，复选框绑定点击事件
checkboxWrapper.onclick = function () {
    // 渲染表格
    renderTable(getData(sourceData));
    drawMultiLineGraph(getData(sourceData));
    drawMultiBarGraph(getData(sourceData));
}
tableWrapper.onmouseout = function () {
    drawMultiLineGraph(getData(sourceData));
    drawMultiBarGraph(getData(sourceData));
}
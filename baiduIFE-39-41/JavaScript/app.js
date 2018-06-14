//网页载入时默认状态初始化
//根据location.search的值初始化复选框
setStatus();

// 渲染表格
renderTable(getData(sourceData));
tableDisplayOpt(); //合并单元格，地区商品位置交换

// 绘制统计图
graph.drawGraph(getData(sourceData));

//监听表格的moursehover事件，绘制单行数据的统计图
graph.setData();

//事件委托，监听复选框点击事件
checkboxWrapper.onclick = function () {
    // 复选框选项改变之后重新渲染表格
    renderTable(getData(sourceData));
    tableDisplayOpt();
    // 重新绘制统计图
    graph.drawGraph(getData(sourceData));
}

//鼠标离开表格时，重新绘制统计图
tableWrapper.onmouseout = function () {
    graph.drawGraph(getData(sourceData));
}
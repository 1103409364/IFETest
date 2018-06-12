//网页载入时默认状态初始化
renderTable(getData(sourceData));
tableDisplayOpt(); //合并单元格，地区商品位置交换
graph.drawGraph(getData(sourceData)); //根据复选框默认选中状态的数据画图
graph.setData(); //监听moursehover事件画图

//事件委托，复选框绑定点击事件
checkboxWrapper.onclick = function () {
    // 渲染表格
    renderTable(getData(sourceData));
    tableDisplayOpt(); //合并单元格，地区商品位置交换
    //画图
    drawMultiLineGraph(getData(sourceData));
    drawMultiBarGraph(getData(sourceData));
}
tableWrapper.onmouseout = function () {
    drawMultiLineGraph(getData(sourceData));
    drawMultiBarGraph(getData(sourceData));
}
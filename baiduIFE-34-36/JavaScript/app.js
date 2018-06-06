//默认状态初始化
renderTable(getData(sourceData));

//事件委托，复选框绑定点击事件
checkboxWrapper.onclick = function (e) {
    var target = e.target;
    // getData(sourceData);
    renderTable(getData(sourceData));
}
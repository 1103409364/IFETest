// 初始化
var initial = function () {
    initialForm();
    // 读取并设置状态
    setFormByStatus();
    // 根据表单状态获取数据
    var region = regionCheckedItem();
    var product = productCheckedItem();
    var data = getData(region, product, sourceData);
    initialTable(data);
    initialGraph(data);
}
// 重绘统计图、表
var reInitial = function () {
    var region = regionCheckedItem();
    var product = productCheckedItem();
    var data = getData(region, product, sourceData);
    initialTable(data);
    initialGraph(data);
}

var __main = function () {
    initial();
}

__main();
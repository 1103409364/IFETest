var initial = function () {
    // 初始化
    initialForm();
    // 根据表单状态获取数据
    var region = regionCheckedItem();
    var product = productCheckedItem();
    var data = getData(region, product, sourceData);
    initialTable(data);
    initialGraph(data);
}

var reInitial = function () {
    var region = regionCheckedItem();
    var product = productCheckedItem();
    var data = getData(region, product, sourceData);
    initialTable(data);
    initialGraph(data);
}

var __main = function () {
    initial();
    var checkWrap = document.getElementById("checkbox-wrapper");
    checkWrap.addEventListener("click", reInitial);
}

__main();
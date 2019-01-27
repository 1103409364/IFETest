//获取表单中被选中的项
var regionCheckedItem = function () {
    var region = document.getElementById("region-wrapper");
    var regionChecked = [];
    regionChecked = getCheckedItem(region);
    return regionChecked;
}
var productCheckedItem = function () {
    var product = document.getElementById("product-wrapper");
    var producChecked = [];
    producChecked = getCheckedItem(product);
    return producChecked;
}

var getCheckedItem = function (element) {
    var checkbox = element.getElementsByTagName("input");
    var checkedItems = [];

    for (let i = 0; i < checkbox.length; i++) {
        var checkboxType = checkbox[i].getAttribute("checkbox-type");
        if (checkbox[i].checked === true && checkboxType === "child") {
            checkedItems.push(checkbox[i].value);
        }
    }
    return checkedItems;

}
//根据复选框选中的项获取数据，数据优先从本地存储获取
var getData = function (sourceData) {
    var storage = window.localStorage;
    var newSourceData;
    var newData = [];
    var regionChecked = [];
    var producChecked = [];

    regionChecked = regionCheckedItem()
    producChecked = productCheckedItem();
    // 遍历查找与ife31data.js的数据相匹配的数据
    for (let i = 0; i < sourceData.length; i++) {
        for (let j = 0; j < regionChecked.length; j++) {
            for (let k = 0; k < producChecked.length; k++) {
                if (sourceData[i].region === regionChecked[j] && sourceData[i].product === producChecked[k]) {
                    newData.push(sourceData[i]);
                }
            }
        }
    }
    // 判断LocalStorage中是否有数据，从LocalStorage中读取数据，判断是否有相同数据，有就替换js文件ife31data中得到的数据。
    if (storage.getItem("newSourceData")) {
        let json = storage.getItem("newSourceData")
        newSourceData = JSON.parse(json);
        for (let i = 0; i < newData.length; i++) {
            for (let j = 0; j < newSourceData.length; j++) {
                if (newData[i].region == newSourceData[j].region && newData[i].product == newSourceData[j].product) {
                    newData[i] = newSourceData[j]; //有相同的数据，用本地存储的数据替换
                }
            }
        }
    }

    return newData; //返回一个对象数组
}
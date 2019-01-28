//根据选中的项获取数据，数据优先从本地存储获取
var getData = function (regionChecked, productChecked, sourceData) {
    var storage = window.localStorage;
    var newSourceData;
    var newData = [];
    // 遍历查找与ife31data.js的数据相匹配的数据
    for (let i = 0; i < sourceData.length; i++) {
        for (let j = 0; j < regionChecked.length; j++) {
            for (let k = 0; k < productChecked.length; k++) {
                if (sourceData[i].region === regionChecked[j] && sourceData[i].product === productChecked[k]) {
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



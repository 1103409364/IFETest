function storageNewData(newData) {
    if (!window.localStorage) {
        alert("浏览器不支持localstorage");
    } else {
        var storage = window.localStorage;
        if (storage.getItem("newSourceData")) {
            let json = storage.getItem("newSourceData")
            let newSourceData = JSON.parse(json); //将JSON字符串转换成为JSON对象

            for (let i = 0; i < newSourceData.length; i++) { //判断是否存在相同的数据
                if (newData["product"] == newSourceData[i]["product"] && newData["region"] == newSourceData[i]["region"]) {
                    newSourceData[i]["sale"] = newData["sale"]; //发现重复的项，用新的sale数据进行替换
                    let d2 = JSON.stringify(newSourceData);
                    storage.setItem("newSourceData", d2); //替换本地数据
                    return true; //结束函数
                }
            }
            newSourceData.push(newData);
            let d2 = JSON.stringify(newSourceData);
            storage.setItem("newSourceData", d2);
        } else {
            let newSourceData = [];
            newSourceData.push(newData);
            let d = JSON.stringify(newSourceData);
            storage.setItem("newSourceData", d);
        }
    }
}
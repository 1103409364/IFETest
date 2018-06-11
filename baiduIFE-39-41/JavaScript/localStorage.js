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
                    newSourceData[i]["sale"] = newData["sale"]; //发现重复，用新的数据进行替换
                    // console.log("重复");
                    // console.log(newSourceData);


                } else {
                    newSourceData.push(newData);
                }
                let d2 = JSON.stringify(newSourceData); //将JSON对象转换成为JSON字符串
                storage.setItem("newSourceData", d2);
            }
        } else {
            let newSourceData = [];
            newSourceData.push(newData);
            let d = JSON.stringify(newSourceData); //将JSON对象转换成为JSON字符串
            storage.setItem("newSourceData", d);
        }
    }
}
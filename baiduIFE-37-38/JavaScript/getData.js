var eCN = document.getElementById(regionCheckboxObj[0].value);
var sCN = document.getElementById(regionCheckboxObj[1].value);
var nCN = document.getElementById(regionCheckboxObj[2].value);

var phone = document.getElementById(productCheckboxObj[0].value);
var notebook = document.getElementById(productCheckboxObj[1].value);
var googleHome = document.getElementById(productCheckboxObj[2].value);

var regionArr = [eCN, sCN, nCN];
var productArr = [phone, notebook, googleHome];

function getCheckedItem(data) { //获取复选框被选中的个数
    var checkedArr = [];
    for (let j = 0; j < data.length; j++) {
        if (data[j].checked == true) {
            checkedArr.push(data[j]);
        }
    }
    return checkedArr;
}

//获取复选框选中的数据，优先从本地存储获取数据
function getData(sourceData) {
    var storage = window.localStorage;
    var newSourceData;
    var newData = [];
    var regoinChecked = getCheckedItem(regionArr);
    var productChecked = getCheckedItem(productArr);

    for (let i = 0; i < sourceData.length; i++) {
        for (let j = 0; j < regoinChecked.length; j++) {
            for (let k = 0; k < productChecked.length; k++) {

                if (sourceData[i].region == regoinChecked[j].value && sourceData[i].product == productChecked[k].value) {
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
// 鼠标滑过表格onmouseover表格是获取数据
function getDataOnmouseover() {

}
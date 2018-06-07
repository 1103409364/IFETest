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

//获取表单选中的数据
function getData(sourceData) {
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
    // console.log(newData);
    return newData;
}
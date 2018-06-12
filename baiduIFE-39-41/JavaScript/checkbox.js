var checkboxWrapper = document.getElementById("checkbox-wrapper");
var regionWrapper = document.getElementById("region-wrapper");
var productWrapper = document.getElementById("product-wrapper");
var regionCheckboxObj = [{
    value: "华东",
    text: "华东"
}, {
    value: "华南",
    text: "华南"
}, {
    value: "华北",
    text: "华北"
}]

var productCheckboxObj = [{
    value: "手机",
    text: "手机"
}, {
    value: "笔记本",
    text: "笔记本"
}, {
    value: "智能音箱",
    text: "智能音箱"
}]

creatCheckBox(regionWrapper, regionCheckboxObj);

creatCheckBox(productWrapper, productCheckboxObj);

function creatCheckBox(checkBoxWrapper, objData) {
    //生成全选
    var id = checkBoxWrapper.id + "all";
    var checkAllLabel = document.createElement("label");
    checkAllLabel.setAttribute("for", id);
    checkAllLabel.innerHTML = "全选";
    checkBoxWrapper.appendChild(checkAllLabel);
    var checkAll = document.createElement("input");
    checkAll.setAttribute("type", "checkbox");
    checkAll.setAttribute("checkbox-type", "checkAll");
    checkAll.setAttribute("checkbox-type", "all");
    checkAll.setAttribute("id", id);
    checkBoxWrapper.appendChild(checkAll);
    //生成子选项

    var checks = []; //子选项容器

    for (let i = 0; i < objData.length; i++) {
        var dataId = objData[i].value; //value值作为id
        var checkLabel = document.createElement("label");
        checkLabel.setAttribute("for", dataId);
        checkLabel.innerHTML = objData[i].text;
        checkBoxWrapper.appendChild(checkLabel);
        var childCkbox = document.createElement("input");
        childCkbox.setAttribute("type", "checkbox");
        childCkbox.setAttribute("value", objData[i].value);
        childCkbox.setAttribute("checkbox-type", "child");
        childCkbox.setAttribute("id", dataId);
        checkBoxWrapper.appendChild(childCkbox);
        checks.push(childCkbox);
    }

    checks[0].checked = true; //默认选中第一项
    checkBoxWrapper.onclick = function (e) {
        var target = e.target;
        var numChecked = 0; //选中计数

        if (target.type == "checkbox") {
            var attribute = target.getAttribute("checkbox-type"); //读取自定义属性
            if (attribute == "all") {
                if (target.checked == true) { //选中全选复选框时
                    for (let j = 0; j < checks.length; j++) {
                        checks[j].checked = true; //true用boolean值而不是字符串
                    }
                } else { //取消选中全选复选框时
                    for (let j = 0; j < checks.length; j++) {
                        if (j == 0) {
                            checks[j].checked = true; //true用boolean值而不是字符串

                        } else {
                            checks[j].checked = false; //true用boolean值而不是字符串

                        }
                    }
                }
            }
            for (let j = 0; j < checks.length; j++) {
                if (checks[j].checked == true) {
                    numChecked++;
                }
            }
            if (attribute == "child") {
                if (numChecked == 3) {
                    checkAll.checked = true;
                }
                if (numChecked < 3) {
                    checkAll.checked = false;
                }
                if (numChecked == 0) {
                    numChecked = 1;
                    target.checked = true; //设置默认选中一项，剩余一项阻止，此时计数0
                }
            }
            // console.log(numChecked);
        }
        // getData(sourceData);
    }
}

// 通过hash的方式
// 把用户的一些交互状态通过某种方式记录在URL中
// 分享或再次打开某个URL，需要从URL中读取到数据状态，并且进行页面呈现的还原
// 需要记录的状态包括：产品的选择以及地域的选择
// 选中项目的加入数组，未选中的移除
var hashArr = ["华东", "手机"]; //给个默认值
var regionItem = ["华东", "华南", "华北"];
var productItem = ["手机", "智能音箱", "笔记本"]
checkboxWrapper.addEventListener("click", function (e) {
    var target = e.target,
        item = target.value;

    // 判断item是否存在，防止target.checked报错
    if (item) {
        if (target.checked == true) {
            // 判断item是否已经存在,并且不是全选
            if (hashArr.indexOf(item) < 0 && item != "on") {
                hashArr.push(item);
            }
        } else {
            var index = hashArr.indexOf(item);
            hashArr.splice(index, 1);
        }
        //如果点击的是地区全选复选框
        if (target.id == "region-wrapperall") {
            if (target.checked == true) { //全选勾选上
                for (let i = 0; i < regionItem.length; i++) {
                    if (hashArr.indexOf(regionItem[i]) < 0) {
                        hashArr.push(regionItem[i]);
                    }
                }
            } else {
                let index2 = hashArr.indexOf("华南");
                let index3 = hashArr.indexOf("华北");
                if (index2 > 0) {
                    hashArr.splice(index2, 1);
                }
                if (index3 > 0) {
                    hashArr.splice(index3, 1);
                }
                if (hashArr.indexOf("华东") < 0) {
                    hashArr.push("华东");
                }
            }
        }
        //如果点击的是产品全选复选框
        if (target.id == "product-wrapperall") {
            if (target.checked == true) { //全选勾选上
                for (let i = 0; i < productItem.length; i++) {
                    if (hashArr.indexOf(productItem[i]) < 0) {
                        hashArr.push(productItem[i]);
                    }
                }
            } else {
                let index2 = hashArr.indexOf("笔记本");
                let index3 = hashArr.indexOf("智能音箱");
                if (index2 > 0) {
                    hashArr.splice(index2, 1);
                }
                if (index3 > 0) {
                    hashArr.splice(index3, 1);
                }
                if (hashArr.indexOf("手机") < 0) {
                    hashArr.push("手机");
                }
            }
        }

        location.hash = hashArr;
        // console.log(target.checked);
    }
})
// 获取hash值返回数组
function getHash() {
    return location.hash.slice(1).split(",");
}
// hashArr数组是选中的项目， 将他们设为选中
function locationHashChanged() {
    // hashArr = getHash;
    // if (location.hash == "") {
    //     location.hash = ["华东", "手机"];
    // }
    var checkboxGet = checkboxWrapper.getElementsByTagName("input");
    // console.log(decodeURI(getHash())); 中文hash需要解码。解码之后是字符串，要转成数组
    var hashArrDecode = decodeURI(getHash()).split(",");
    console.log(hashArrDecode);

    for (let i = 0; i < checkboxGet.length; i++) {

        if (checkboxGet[i].value != "on") {
            // console.log(checkboxGet[i].value);
            for (let j = 0; j < hashArrDecode.length; j++) {
                if (checkboxGet[i].value == hashArrDecode[j]) {
                    checkboxGet[i].checked = true;
                    console.log(checkboxGet[i]);
                    continue;
                }
                // checkboxGet[i].checked = false;
            }
        }
    }
    // 需要重新渲染表格合并单元格

}
// 进来先执行一次渲染函数
locationHashChanged();
// hash改变事件
window.onhashchange = locationHashChanged;
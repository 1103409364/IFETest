// hash版本的状态保存模块
// 把用户的一些交互状态通过某种方式记录在URL中
// 分享或再次打开某个URL，需要从URL中读取到数据状态，并且进行页面呈现的还原
// 需要记录的状态包括：产品的选择以及地域的选择
var getStatus = function () {
    // 此函数用于获取checkbox的选中状态
    let box = document.querySelectorAll("input[type=checkbox]");
    let str = "";
    for (let i = 0, len = box.length; i < len; i++) {
        if (box[i].checked === true) {
            str += "1";
        } else {
            str += "0";
        }
    }
    return str;
}

var setFormByStatus = function () {
    // 默认选中地区和商品的第一项
    if (location.hash === "") {
        location.hash = "01000100";
    }
    // 获取状态
    let str = location.hash;
    // 这个用来重设checkbox的选中状态
    let box = document.querySelectorAll("input[type=checkbox]");
    let strArr = location.hash.slice(1).split("");
    for (let i = 0, len = strArr.length; i < len; i++) {
        if (strArr[i] === "1") {
            box[i].checked = true;
        } else if (strArr[i] === "0") {
            box[i].checked = false;
        }
    }
}
var checkboxWrapper = document.getElementById("checkbox-wrapper");

checkboxWrapper.addEventListener("click", function () {
    let str = getStatus();
    location.hash = str;
});

var locationHashChanged = function () {
    let str = getStatus();
    // 取得状态，设置复选框的状态
    setFormByStatus();
}
window.addEventListener("hashchange", locationHashChanged);
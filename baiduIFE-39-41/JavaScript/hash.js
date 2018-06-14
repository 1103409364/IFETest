// 通过hash的方式
// 把用户的一些交互状态通过某种方式记录在URL中
// 分享或再次打开某个URL，需要从URL中读取到数据状态，并且进行页面呈现的还原
// 需要记录的状态包括：产品的选择以及地域的选择
function getStatus() {
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
function setStatus() {
    // 默认选中地区和商品的第一项
    if (location.hash === "") {
        location.hash = "01000100";
    }
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

checkboxWrapper.addEventListener("click", function () {
    let str = getStatus();
    location.hash = str;
});

function locationHashChanged() {
    let str = getStatus();
    setStatus();

    renderTable(getData(sourceData));
    tableDisplayOpt();
    // 绘制统计图
    graph.drawGraph(getData(sourceData));
}
window.onhashchange = locationHashChanged;



//下面这种写法过于繁琐，只要记录复选框的选中与未选中状态即可
// 选中项目的加入数组，未选中的移除
// var hashArr = [];
// var regionItem = ["华东", "华南", "华北"];
// var productItem = ["手机", "智能音箱", "笔记本"]
// checkboxWrapper.addEventListener("click", function (e) {
//     var target = e.target,
//         item = target.value;

//     // 判断item是否存在，防止target.checked报错
//     if (item) {
//         if (target.checked == true) {
//             // 判断item是否已经存在,并且不是全选
//             if (hashArr.indexOf(item) < 0 && item != "on") {
//                 hashArr.push(item);
//             }
//         } else {
//             var index = hashArr.indexOf(item);
//             hashArr.splice(index, 1);
//         }
//         //如果点击的是地区全选复选框
//         if (target.id == "region-wrapperall") {
//             if (target.checked == true) { //全选勾选上
//                 for (let i = 0; i < regionItem.length; i++) {
//                     if (hashArr.indexOf(regionItem[i]) < 0) {
//                         hashArr.push(regionItem[i]);
//                     }
//                 }
//             } else {
//                 let index2 = hashArr.indexOf("华南");
//                 let index3 = hashArr.indexOf("华北");
//                 if (index2 > 0) {
//                     hashArr.splice(index2, 1);
//                 }
//                 if (index3 > 0) {
//                     hashArr.splice(index3, 1);
//                 }
//                 if (hashArr.indexOf("华东") < 0) {
//                     hashArr.push("华东");
//                 }
//             }
//         }
//         //如果点击的是产品全选复选框
//         if (target.id == "product-wrapperall") {
//             if (target.checked == true) { //全选勾选上
//                 for (let i = 0; i < productItem.length; i++) {
//                     if (hashArr.indexOf(productItem[i]) < 0) {
//                         hashArr.push(productItem[i]);
//                     }
//                 }
//             } else {
//                 let index2 = hashArr.indexOf("笔记本");
//                 let index3 = hashArr.indexOf("智能音箱");
//                 if (index2 > 0) {
//                     hashArr.splice(index2, 1);
//                 }
//                 if (index3 > 0) {
//                     hashArr.splice(index3, 1);
//                 }
//                 if (hashArr.indexOf("手机") < 0) {
//                     hashArr.push("手机");
//                 }
//             }
//         }

//         location.hash = hashArr;
//         // console.log(target.checked);
//     }
// })
// // 获取hash值返回数组
// function getHash() {
//     return location.hash.slice(1).split(",");
// }
// // 默认选中第一项
// function locationHashChanged() {
//     // 默认选中第一项
//     if (location.hash == "") {
//         location.hash = ["华东", "手机"];
//     }
//     // hashArr网页载入时初始化
//     hashArr = decodeURI(getHash()).split(",");

//     var checkboxGet = checkboxWrapper.getElementsByTagName("input");
//     // console.log(decodeURI(getHash())); 中文hash取回时需要解码。解码之后是字符串，要转成数组
//     var hashArrDecode = decodeURI(getHash()).split(",");
//     // console.log(hashArrDecode);

//     for (let i = 0; i < checkboxGet.length; i++) {
//         if (checkboxGet[i].value != "on") {
//             // console.log(checkboxGet[i].value);
//             checkboxGet[i].checked = false; //先默认hash中不存在，再遍历hasharr，若存在设为true
//             for (let j = 0; j < hashArrDecode.length; j++) {
//                 if (checkboxGet[i].value == hashArrDecode[j]) {
//                     checkboxGet[i].checked = true;

//                     // console.log(checkboxGet[i]);
//                     break;
//                 }
//             }
//         }
//     }
//     // 差个全选状态全选复选框选中没写
//     // hash在 regionItem 和productItem中的数量等于3就选中全选按钮。
// }
// // 进来先执行一次渲染函数
// locationHashChanged();

// // hash改变事件
// window.onhashchange = locationHashChanged;
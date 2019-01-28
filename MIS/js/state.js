// state版本的状态保存模块，参考了Zjinxing的代码。
// state版本是通过history.pushState()方法改变location.search的值来表示不同的状态
// hash版本是直接操作location.hash
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
    if (location.search === "") {
        location.search = "01000100";
    }
    // let str = getStatus();
    let str = location.search;
    // 这个用来重设checkbox的选中状态
    let box = document.querySelectorAll("input[type=checkbox]");
    let strArr = location.search.slice(1).split("");
    for (let i = 0, len = strArr.length; i < len; i++) {
        if (strArr[i] === "1") {
            box[i].checked = true;
        } else if (strArr[i] === "0") {
            box[i].checked = false;
        }
    }
}

//监听checkbox点击事件
checkboxWrapper.addEventListener("click", function () {
    let str = getStatus();
    history.pushState("state", null, "?" + str);
});

//监听前进后退事件，获取状态，重设状态，重新渲染图表
window.onpopstate = function () {
    setStatus();

    renderTable(getData(sourceData));
    tableDisplayOpt();
    // 绘制统计图
    graph.drawGraph(getData(sourceData));
}


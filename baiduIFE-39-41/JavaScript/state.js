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
    console.log(str);

    return str;
}
function setStatus() {
    if (location.search === "") {
        location.search = "01000100";
    }
    let str = getStatus();
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
checkboxWrapper.addEventListener("click", function () {
    let str = getStatus();
    history.replaceState("state", null, "?" + str);
});
function reDraw() {
    let query = location.href.split("?")[1];
    let str = getStatus();
    if (!query) {
        // 首先判断location.search是否存在，如果不存在则根据checkbox选中状态替换一条历史记录
        history.replaceState("state", null, "?" + str)
    } else {
        // 如果存在则根据location.search设置checkbox状态，并执行以下函数
        setStatus();
    }
}

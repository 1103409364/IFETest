var initialForm = function () {
    var region = [{
        value: "华东",
        text: "华东"
    }, {
        value: "华南",
        text: "华南"
    }, {
        value: "华北",
        text: "华北"
    }];

    var product = [{
        value: "手机",
        text: "手机"
    }, {
        value: "笔记本",
        text: "笔记本"
    }, {
        value: "智能音箱",
        text: "智能音箱"
    }];

    var checkBoxWrapper = document.getElementById("checkbox-wrapper");
    var regionWrapper = document.getElementById("region-wrapper");
    var productWrapper = document.getElementById("product-wrapper");

    creatCheckBox(regionWrapper, region);
    creatCheckBox(productWrapper, product);
    formAddEvent(regionWrapper);
    formAddEvent(productWrapper);
}
// 生成复选框
var creatCheckBox = function (checkBoxWrapper, options) {
    //生成标签为全选的复选框
    var id = checkBoxWrapper.id + "all";
    var checkBoxElements = `
        <label for=${id}>全选</label>
        <input type="checkbox" checkbox-type="all" id=${id} class="all">
    `
    for (let i = 0; i < options.length; i++) {
        var value = options[i].value; //value值作为id
        var txt = options[i].text;
        // 默认选中第一项
        if (i === 0) {
            checkBoxElements += `
            <input type="checkbox" value=${value} checkbox-type="child" id=${value} checked=true>
            <label for=${value}>${txt}</label>
        `
            continue;
        }
        checkBoxElements += `
            <input type="checkbox" value=${value} checkbox-type="child" id=${value}>
            <label for=${value}>${txt}</label>
        `
    }
    checkBoxWrapper.innerHTML = checkBoxElements;
}
// 表单添加事件监听
var formAddEvent = function (wrapperElements) {
    wrapperElements.addEventListener("click", function (e) {
        var target = e.target;
        var checks = wrapperElements.getElementsByTagName("input");
        var checkAll = wrapperElements.querySelector(".all");
        if (target.type == "checkbox") {
            var checkboxType = target.getAttribute("checkbox-type"); //读取自定义属性

            if (checkboxType == "all") {
                if (target.checked == true) {
                    for (let j = 1; j < checks.length; j++) {
                        checks[j].checked = true;
                    }
                } else { //取消选中全选复选框时，让第一项为选中状态
                    for (let j = 1; j < checks.length; j++) {
                        if (j === 1) {
                            checks[j].checked = true;

                        } else {
                            checks[j].checked = false;
                        }
                    }
                }
            }

            var numChecked = 0; //选中计数
            // 点击时计算选中的个数
            for (let j = 1; j < checks.length; j++) {
                if (checks[j].checked == true) {
                    numChecked++;
                }
            }
            // 3项全部选中时，选中自动选中”全选“，只有一项选中时候，禁止取消选中状态
            if (checkboxType == "child") {
                if (numChecked == 3) {
                    checkAll.checked = true;
                }
                if (numChecked < 3) {
                    checkAll.checked = false;
                }
                if (numChecked == 0) {
                    numChecked = 1;
                    target.checked = true; //设置默认选中一项，
                }
            }
        }
    })



}
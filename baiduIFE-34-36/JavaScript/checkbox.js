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
                for (let j = 0; j < checks.length; j++) {
                    checks[j].checked = true; //true用boolean值而不是字符串
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
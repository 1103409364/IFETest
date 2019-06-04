// 封装ajax
var majax = {
    // get方法
    get: function (URL, queryJSON, callback) {
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            // 兼容旧版ie
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error("请求失败" + "status:" + xhr.status), undefined);
                }
            }
        }

        var querystring = majax.queryJSONTostring(queryJSON);
        URL = querystring ? (URL + "?" + querystring) : URL;

        xhr.open("get", URL, true);

        xhr.send(null);
    },
    // post方法
    post: function (URL, queryJSON, callback) {
        if (window.XMLHttpRequest) {
            var xhr = new window.XMLHttpRequest();
        } else {
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error("请求失败" + "status:" + xhr.status), undefined);
                }
            }
        }

        var querystring = majax.queryJSONTostring(queryJSON);

        xhr.open("post", URL, true);
        // 设置请求头
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(querystring);
    },
    // jsonp 方法
    jsonp: function (URL, queryJSON, callbackname, callback) {
        // 将callback添加到全局
        window[callbackname] = callback;
        // 创建script节点
        var scriptElement = document.createElement("script");
        document.body.appendChild(scriptElement);
        var querystring = majax.queryJSONTostring(queryJSON);
        // 给 script 节点添加 src 属性，发出请求
        scriptElement.src = querystring ? (URL + "?" + querystring) : URL;
        //删除临时节点
        document.body.removeChild(scriptElement);
    },
    // 辅助方法，将queryJSON转为查询字符串
    queryJSONTostring: function (json) {
        var arr = []; //结果数组
        for (var k in json) {
            arr.push(k + "=" + encodeURIComponent(json[k]));
        }
        return arr.join("&");
    }
}
// 一些辅助函数
var HtmlUtil = {
    maxValue: function (arr) {
        let max = arr[0];
        for (let i = 0; i < arr.length; i++) {
            max = Number(arr[i]) <= max ? max : Number(arr[i]);
        }
        return max;
    },
    isNumber: function (n) {
        return !isNaN(Number(n));
    },
    // 开关
    toggle: function (element, cls) {
        if (element.classList.contains(cls)) {
            element.classList.remove(cls)
        } else {
            element.classList.add(cls)
        }
    }
};

// 本地储存数据
var storageNewData = function (newData) {
    if (!window.localStorage) {
        alert("浏览器不支持localstorage");
    } else {
        var storage = window.localStorage;
        if (storage.getItem("newSourceData")) {
            let json = storage.getItem("newSourceData")
            let newSourceData = JSON.parse(json); //将JSON字符串转换成为JSON对象

            for (let i = 0; i < newSourceData.length; i++) { //判断是否存在相同的数据
                if (newData["product"] == newSourceData[i]["product"] && newData["region"] == newSourceData[i]["region"]) {
                    newSourceData[i]["sale"] = newData["sale"]; //发现重复的项，用新的sale数据进行替换
                    let d2 = JSON.stringify(newSourceData);
                    storage.setItem("newSourceData", d2); //替换本地数据
                    return true; //结束函数
                }
            }
            newSourceData.push(newData);
            let d2 = JSON.stringify(newSourceData);
            storage.setItem("newSourceData", d2);
        } else {
            let newSourceData = [];
            newSourceData.push(newData);
            let d = JSON.stringify(newSourceData);
            storage.setItem("newSourceData", d);
        }
    }
}

//根据选中的项获取数据，数据优先从本地存储获取
var getData = function (regionChecked, productChecked, sourceData) {
    var storage = window.localStorage;
    var newSourceData;
    var newData = [];
    // 遍历查找与ife31data.js的数据相匹配的数据
    for (let i = 0; i < sourceData.length; i++) {
        for (let j = 0; j < regionChecked.length; j++) {
            for (let k = 0; k < productChecked.length; k++) {
                if (sourceData[i].region === regionChecked[j] && sourceData[i].product === productChecked[k]) {
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

// state版本的状态保存模块
// state版本是通过history.pushState()方法改变location.search的值来表示不同的状态
// hash版本是直接操作location.hash
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
// 根据url保存的状态，设置表单复选框的状态
var setFormByStatus = function () {
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

// 监听点击事件移到form.js
// var checkboxWrapper = document.getElementById("checkbox-wrapper");
// //监听checkbox点击事件
// checkboxWrapper.addEventListener("click", function () {
//     let str = getStatus();
//     history.pushState("state", null, "?" + str);
// });
//监听前进后退事件，获取状态，重设状态，重新渲染图表
window.onpopstate = function () {
    setFormByStatus();
}
/////////////////////////////////////////////////
// 复选框
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
    addEventCheckLogic(regionWrapper);
    addEventCheckLogic(productWrapper);
    // 为状态和重新渲染添加点击事件
    addEventStateAndInitial();
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
// 分别给全选的CheckBox和各个单选的CheckBox绑定上点击事件
// 对于全选的CheckBox的点击事件，要做的事情很简单，让所有的CheckBox全部勾选上
// 对于单个的CheckBox，每次点击要做如下判断：
// 在点击之前它是不是唯一一个被勾选的？如果是的话，阻止这次点击默认事件，或者立马又将其checked状态置为真
// 点击之后，是不是满足了全选状态，并对应修改全选CheckBox的状态
var addEventCheckLogic = function (wrapperElements) {
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

var addEventStateAndInitial = function () {
    var checkboxWrapper = document.getElementById("checkbox-wrapper");
    checkboxWrapper.addEventListener("click", function () {
        let str = getStatus();
        history.pushState("state", null, "?" + str);
    });
    // 复选框被点击时，重新渲染图表
    checkboxWrapper.addEventListener("click", reInitial);
}

//获取表单被选中的地区
var regionCheckedItem = function () {
    var region = document.getElementById("region-wrapper");
    var regionChecked = [];
    regionChecked = getCheckedItem(region);
    return regionChecked;
}
//获取表单被选中的产品
var productCheckedItem = function () {
    var product = document.getElementById("product-wrapper");
    var producChecked = [];
    producChecked = getCheckedItem(product);
    return producChecked;
}

var getCheckedItem = function (element) {
    var checkbox = element.getElementsByTagName("input");
    var checkedItems = [];

    for (let i = 0; i < checkbox.length; i++) {
        var checkboxType = checkbox[i].getAttribute("checkbox-type");
        if (checkbox[i].checked === true && checkboxType === "child") {
            checkedItems.push(checkbox[i].value);
        }
    }
    return checkedItems;

}
////////////////////////////////////
// table
var initialTable = function (data) {
    var tableHead = ["商品", "地区", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

    var tableWrapper = document.getElementById("table-wrapper");

    renderTable(tableWrapper, data, tableHead);
    tableAddEvent();
    tableDisplayOpt();
}

//渲染表格
var renderTable = function (tableWrapper, data, tableHead) {
    tableWrapper.innerHTML = ""; //清除旧表格
    var table = "";
    var tr = "";
    var th = "";
    //生成表头
    for (let i = 0; i < tableHead.length; i++) {
        th += `<th>${tableHead[i]}</th>`;
    }
    tr += `<tr>${th}</tr>`

    for (let i = 0; i < data.length; i++) {
        var td = "";

        for (x in data[i]) {
            if (x === "region" || x === "product") {
                td += `<td class=${x}>${data[i][x]}</td>`
            } else if (x == "sale") {
                for (let j = 0; j < data[i][x].length; j++) {
                    td += `
                        <td>
                            <input type="button" value="确定" class="confirm hide">
                            <input type="button" value="取消" class="cancel hide">
                            <input type="text" value=${ data[i][x][j]} class="inputData hide">
                            <input type="button" id = "edit" class = "edit" value ="Edit">
                            ${ data[i][x][j]}
                        </td>
                    `
                }
                tr += `<tr>${td}</tr>`
            }
        }
    }
    table += `<table id = "mytable">${tr}</table>`

    tableWrapper.innerHTML = table;
}
{/* <img  src="images/edit.png" alt="编辑" width="15px" height="15px" id = "edit" class = "edit"> */ }

// 绑定事件
var tableAddEvent = function () {
    var table = document.getElementById("mytable");
    var isNumber = HtmlUtil.isNumber;
    // 鼠标左键按下事件
    table.addEventListener("mousedown", function (e) {
        var target = e.target;
        var confirm = target.parentElement.children[0];
        var cancel = target.parentElement.children[1];
        var input = target.parentElement.children[2];
        var editImg = target.parentElement.children[3];

        // 点击编辑
        if (target.classList.contains("edit")) {
            var confirm = target.parentElement.children[0];
            var cancel = target.parentElement.children[1];
            var input = target.parentElement.children[2];

            showElement(confirm);
            showElement(cancel);
            showElement(input);
            hideElement(editImg);
            // 与blur冲突,需要加个延时
            setTimeout(() => {
                // input.focus(); //获得输入框焦点
                input.select(); //默认选中输入框的内容
            }, 10);
        }
        // 点击确定
        if (target.classList.contains("confirm")) {
            // 暂存表格td数据
            var temp = target.parentElement.textContent.trim();
            if (!isNumber(input.value)) {
                alert("请输入数字");
                input.value = temp;
                // 输入不同数字才需储存
            } else if (input.value != temp) {
                hideElement(confirm);
                hideElement(cancel);
                hideElement(input);
                showElement(editImg);
                // 储存数据更新表格
                updateTable(target, table);
            } else {
                // 没输入新的数据，恢复非编辑状态
                hideElement(confirm);
                hideElement(cancel);
                hideElement(input);
                showElement(editImg);
            }
        }
        // 点击取消
        if (target.classList.contains("cancel")) {
            temp = target.parentElement.textContent.trim();
            hideElement(confirm);
            hideElement(cancel);
            hideElement(input);
            showElement(editImg);
            //取消后，文本框恢复原来的数值
            input.value = temp;
        }
    });
    // 键盘按下事件
    table.addEventListener("keydown", function (e) {
        // log(e.target)
        var target = e.target;
        var confirm = target.parentElement.children[0];
        var cancel = target.parentElement.children[1];
        var input = target.parentElement.children[2];
        var editImg = target.parentElement.children[3];
        if (e.keyCode == "27") {
            hideElement(confirm);
            hideElement(cancel);
            hideElement(input);
            showElement(editImg);
        }
        if (e.keyCode == "13") {
            var temp = target.parentElement.textContent.trim();
            if (!HtmlUtil.isNumber(target.parentElement.children[2].value)) {
                alert("请输入数字");
                // this.parentElement.children[2].value = "";
                this.parentElement.children[2].focus();
            } else if (input.value != temp) {
                hideElement(confirm);
                hideElement(cancel);
                hideElement(input);
                showElement(editImg);
                updateTable(target, table);
            } else {
                hideElement(confirm);
                hideElement(cancel);
                hideElement(input);
                showElement(editImg);
            }
        }
    })
    // 表格失去焦点事件
    table.addEventListener("blur", function (e) {
        var target = e.target;
        var confirm = target.parentElement.children[0];
        var cancel = target.parentElement.children[1];
        var input = target.parentElement.children[2];
        var editImg = target.parentElement.children[3];
        var temp = target.parentElement.textContent.trim()
        hideElement(confirm);
        hideElement(cancel);
        hideElement(input);
        showElement(editImg);
        input.value = temp;
    }, true)

    // 鼠标穿过事件
    table.addEventListener("mouseover", function (e) {
        target = e.target;

        var tr = target.parentElement;
        //还有一种情况，父元素的父元素也可能是tr
        var tr2 = target.parentElement.parentElement;
        var region = [], product = [];

        //判tr2是不是表格的行tr
        if (tr.cells || tr2.cells) {
            if (tr2.cells) {
                tr = tr2;
            }
            var cell0 = tr.cells[0]
            var cell1 = tr.cells[1]
            if (cell0.classList.contains("product")) {
                product.push(cell0.textContent);
                region.push(cell1.textContent);
            } else if (cell0.classList.contains("region")) {
                product.push(cell1.textContent);
                region.push(cell0.textContent);
            }

            var data = getData(region, product, sourceData);

            //当前鼠标划过的表格内容不是数字就不画图
            if (HtmlUtil.isNumber(tr.cells[2].textContent)) {
                if (target !== cell0) {
                    // 输入数据点击确定后会促发mouseover，使统计图得到更新
                    initialGraph(data);
                }
                // 鼠标在合并的单元格之上时，绘制选中的多个数据的统计图
                if (target === cell0) {
                    if (target.classList.contains("product")) {
                        region = regionCheckedItem();
                    } else {
                        product = productCheckedItem();
                    }
                    data = getData(region, product, sourceData);
                    initialGraph(data);
                }
            }
        }
    })
    // 鼠标离开表格重新绘制统计图
    table.addEventListener("mouseout", function () {
        var region = regionCheckedItem();
        var product = productCheckedItem();
        var data = getData(region, product, sourceData);
        initialGraph(data);
    })
}
// 隐藏元素
var hideElement = function (ele) {
    if (!ele.classList.contains("hide")) {
        ele.classList.add("hide");
    }
}
// 显示元素
var showElement = function (ele) {
    if (ele.classList.contains("hide")) {
        ele.classList.remove("hide");
    }
}
//数据更新表格
var updateTable = function (target, table) {
    var newData = {};
    var sale = [];
    var tr = target.parentElement.parentElement;
    var inputData = tr.getElementsByClassName("inputData");

    if (table.rows[0].cells[0].innerHTML === "商品") {
        newData["product"] = tr.cells[0].innerHTML;
        newData["region"] = tr.cells[1].innerHTML;
        for (let i = 0; i < inputData.length; i++) {
            sale.push(Number(inputData[i].value)); //输入值是字符串，转数字
        }
        newData["sale"] = sale;
    } else {
        newData["product"] = tr.cells[1].innerHTML;
        newData["region"] = tr.cells[0].innerHTML;
        for (let i = 0; i < inputData.length; i++) {
            sale.push(Number(inputData[i].value));
        }
        newData["sale"] = sale;
    }
    // 储存新数据到本地
    storageNewData(newData);

    // 输入新数据之后重新初始化渲染表格
    var region = regionCheckedItem();
    var product = productCheckedItem();
    var data = getData(region, product, sourceData);
    initialTable(data);
}

// 表格显示调整，合并单元格
var tableDisplayOpt = function () {
    var table = document.getElementById("mytable");
    var regionChecked = [];
    var producChecked = [];

    //下面两个函数在getData.js
    regionChecked = regionCheckedItem()
    producChecked = productCheckedItem();
    var regoinCheckedNum = regionChecked.length;
    var productCheckedNum = producChecked.length;

    // 当商品选择了一个，地区选择了多个的时候，商品作为第一列，地区作为第二列，把相同商品列合并，留一个商品名称
    if (regoinCheckedNum > 1 && productCheckedNum == 1) {
        for (let i = 1; i <= regoinCheckedNum; i++) {
            if (i == 1) {
                table.rows[i].cells[0].setAttribute("rowspan", regoinCheckedNum);
            } else {
                table.rows[i].cells[0].setAttribute("style", "display:none");
            }
        }
    }
    //当地区选择了一个，商品选择了多个的时候，地区作为第一列，商品作为第二列，把相同地区合并
    if (regoinCheckedNum == 1 && productCheckedNum > 1) {
        //交换第一列和第二列的单元格
        for (let i = 0; i < table.rows.length; i++) {
            let tr = table.rows[i];
            let cell0 = table.rows[i].cells[0];
            let cell1 = table.rows[i].cells[1];
            // 取得行第1个单元格，插入到第0个单元格前面
            tr.insertBefore(cell1, cell0)
        }
        for (let i = 1; i <= productCheckedNum; i++) {
            if (i == 1) {
                table.rows[i].cells[0].setAttribute("rowspan", productCheckedNum);
            } else {
                table.rows[i].cells[0].setAttribute("style", "display:none");
            }
        }
    }
    //当商品和地区都选择了多于一个，以商品为第一列，地区为第二列，商品列对同样的商品单元格进行合并
    if (regoinCheckedNum > 1 && productCheckedNum > 1) {
        for (let j = 0; j < table.rows.length; j++) {
            if (j % regoinCheckedNum == 1) {
                table.rows[j].cells[0].setAttribute("rowspan", regoinCheckedNum);
            } else if (j != 0) { //表头不处理
                table.rows[j].cells[0].setAttribute("style", "display:none");
            }
        }
    }
}
////////////////////////////////////////////////////////////////
// 初始化折线图和柱状图
var initialGraph = function (data) {
    // 颜色数组
    var colorArr = ["#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#ff7c7c", "#9287e7"];
    // 获取柱状图容器
    var barWrapper = document.getElementById("bar-wrapper");
    // 获取折线图容器
    var lineWrapper = document.getElementById("line-wrapper");
    var newData = [],
        maxValueArr = [];

    for (let i = 0; i < data.length; i++) {
        //从每一组数据中获得最大值，放入maxValueArr
        maxValueArr.push(HtmlUtil.maxValue(data[i].sale));
        newData.push(data[i].sale); //获取数据对象中的sale
    }

    //最大值中的最大值，就是几组数据中的最大值，用于确定y轴分度值
    var maxY = HtmlUtil.maxValue(maxValueArr);
    //y值范围，控制图表的最大值的高度，留10%空白
    var maxValue = Math.floor(maxY * 1.1);

    drawMultiBarGraph(colorArr, barWrapper, newData, maxValue);
    drawMultiLineGraph(colorArr, lineWrapper, newData, maxValue);
}

// 绘制多组柱状图,参数是对象数组
var drawMultiBarGraph = function (colorArr, barWrapper, newData, maxValue) {
    barWrapper.innerHTML = "";
    ctx = drawAxis(barWrapper, maxValue);
    // ctx.clearRect(0, 0, 650, 330);//清除画布应该用 ctx.clearRect()

    for (let j = 0; j < newData.length; j++) {
        for (let i = 0; i < 12; i++) {
            var step = 50;
            // y轴高度240
            let heightData = newData[j][i] / maxValue * 210
            let y = 270 - heightData;
            let x, widthX;
            if (newData.length > 1) {
                //不同数据设置不同的颜色
                x = 35 + step * i;
                widthX = 40 / newData.length;
                ctx.fillStyle = colorArr[j % 6];
            } else {
                x = 40 + step * i;
                widthX = 30 / newData.length;
                ctx.fillStyle = colorArr[2];
            }
            x = x + j * widthX;
            ctx.fillRect(x, y, widthX, heightData)
            ctx.stroke();
        }
    }
}

//绘制多组折线图，参数是对象数组
var drawMultiLineGraph = function (colorArr, lineWrapper, newData, maxValue) {
    lineWrapper.innerHTML = "";

    //画坐标轴，返回ctx对象
    ctx = drawAxis(lineWrapper, maxValue);
    // 开始画折线图，加0.5防止线条发虚
    for (let j = 0; j < newData.length; j++) {
        for (let i = 0; i < 12; i++) {
            var step = 50;
            //当前点
            let heightData1 = newData[j][i] / maxValue * 210;
            //下一个点
            let heightData2 = newData[j][i + 1] / maxValue * 210;
            // 画当前点到下一个点的线，原位置30.5右移25
            let x1 = 55.5 + step * i;
            let x2 = 55.5 + step * (i + 1);
            let y1 = 270.5 - heightData1;
            let y2 = 270.5 - heightData2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            //只有一组数据的时候，用默认颜色，否则遍历数组中的颜色
            if (newData.length > 1) {
                ctx.strokeStyle = colorArr[j % 6];
                ctx.fillStyle = colorArr[j % 6];

            } else {
                ctx.strokeStyle = colorArr[2];
                ctx.fillStyle = colorArr[2];
            }
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x1, y1, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

//画坐标轴 canvas版 画布尺寸x 650 y 330
var drawAxis = function (wrapper, maxValue) {
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "line");
    canvas.setAttribute("width", "650");
    canvas.setAttribute("height", "330");
    wrapper.appendChild(canvas);

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.save();
        //添加ctx.beginPath();否则xy轴颜色会被覆盖.beginPath()告诉画布：“我要开始画草稿了，请把之前的都清除掉。”
        ctx.beginPath();
        // 画个L作为坐标轴
        ctx.moveTo(30.5, 40);
        // y轴
        ctx.lineTo(30.5, 270.5);
        // x轴
        ctx.lineTo(630.5, 270.5);
        ctx.stroke();
        // 画y轴刻度
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            let y = 60.5 + 35 * i;
            let valueY = maxValue * (6 - i) / 6;
            ctx.moveTo(30.5, y);
            ctx.lineTo(630.5, y);
            ctx.strokeStyle = "#dbdbdb";
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(30.5, y);
            ctx.lineTo(35, y);
            ctx.strokeStyle = "#000";
            ctx.stroke();
            ctx.font = "12px 微软雅黑";
            // y轴文本右对齐
            ctx.textAlign = "right";
            ctx.fillText(Math.round(valueY), 28, y + 5); //四舍五入
        }
        // x轴刻度
        ctx.restore();
        for (let i = 0; i < 12; i++) {
            ctx.beginPath();
            // 分度值
            var step = 50;
            // 刻度右移动25
            let x = 55.5 + step * i;
            let month = (i + 1) + "月";
            ctx.moveTo(x, 270.6);
            ctx.lineTo(x, 275);
            ctx.stroke();
            ctx.font = "13px 微软雅黑";
            // x轴文本居中对齐
            ctx.textAlign = "center";
            ctx.fillText(month, x, 290);
        }
    }
    return ctx;
}




// 总的初始化
var initial = function () {
    initialForm();
    // 读取并设置状态
    setFormByStatus();
    // 根据表单状态获取数据
    var region = regionCheckedItem();
    var product = productCheckedItem();
    var data = getData(region, product, sourceData);
    initialTable(data);
    initialGraph(data);
}
// 重绘统计图、表
var reInitial = function () {
    var region = regionCheckedItem();
    var product = productCheckedItem();
    var data = getData(region, product, sourceData);
    initialTable(data);
    initialGraph(data);
}

var downloadImg = function () {
    // 下载图片
    var canvas = document.querySelectorAll('canvas')[0],
        ctx = canvas.getContext('2d')
    function imgType(ty) {
        let type = ty.toLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    }

    function download() {
        let type = 'png';   //设置下载图片的格式
        let img_png_src = canvas.toDataURL("image/png");  //将canvas保存为图片
        let imgData = img_png_src.replace(imgType(type), 'image/octet-stream');
        let filename = '图片' + '.' + type; //下载图片的文件名
        saveFile(imgData, filename);
    }

    let saveFile = function (data, fileName) {
        let save_link = document.createElement('a');
        save_link.href = data;
        save_link.download = fileName;
        let event = document.createEvent('MouseEvents');
        event.initEvent("click", true, false);
        save_link.dispatchEvent(event);
    };

    document.getElementById('download').onclick = download;
}

var sourceData;

var __main = function () {
    majax.get("./mock/data.json", {}, (err, data) => {
        sourceData = (JSON.parse(data)).results;
        initial();
        downloadImg();
    })
}

__main();
var tableHead = ["商品", "地区", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
var tableWrapper = document.getElementById("table-wrapper");

//渲染数据
function renderTable(data) {
    tableWrapper.innerHTML = ""; //清除上次的数据
    var table = document.createElement("table");
    table.setAttribute("id", "mytable");
    tableWrapper.appendChild(table);
    var tr = document.createElement("tr");
    table.appendChild(tr);


    for (let i = 0; i < tableHead.length; i++) { //添加表头
        var th = document.createElement("th");
        th.innerHTML = tableHead[i];
        tr.appendChild(th);
    }
    for (let i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        table.appendChild(tr);
        for (x in data[i]) { //遍历对象的属性x
            if (x == "product" || x == "region") {
                var td = document.createElement("td");
                td.innerHTML = data[i][x];
                tr.appendChild(td);
            } else {
                for (let j = 0; j < data[i][x].length; j++) { //data[i]对象的的第三个属性sale是数组，对齐进行遍历填充
                    var td = document.createElement("td"),
                        inputData = document.createElement("input"),
                        inputConfirm = document.createElement("input"),
                        inputCancel = document.createElement("input"),
                        img = document.createElement("img"),
                        textCont = document.createTextNode(data[i][x][j]);
                    img.setAttribute("src", "images/edit.png");
                    img.setAttribute("alt", "编辑");
                    img.setAttribute("width", "15px");
                    img.setAttribute("height", "15px");
                    inputConfirm.setAttribute("type", "button");
                    inputConfirm.setAttribute("value", "确定");
                    inputConfirm.setAttribute("class", "confirm");
                    // inputConfirm.setAttribute("style", "display:none"); 改为css文件设置样式
                    inputCancel.setAttribute("type", "button");
                    inputCancel.setAttribute("value", "取消");
                    inputCancel.setAttribute("class", "cancel");
                    // inputCancel.setAttribute("style", "display:none");
                    inputData.setAttribute("type", "text");
                    inputData.setAttribute("value", data[i][x][j]);
                    inputData.setAttribute("class", "inputData");
                    // inputData.setAttribute("style", "display:none");

                    td.appendChild(inputConfirm);
                    td.appendChild(inputCancel);
                    td.appendChild(inputData); //输入框
                    td.appendChild(img);
                    td.appendChild(textCont);
                    // inputData.setAttribute("value", data[i][x][j]);

                    // td.innerHTML = data[i][x][j];
                    tr.appendChild(td);

                    //点击编辑图标显示按钮和输入框
                    img.onclick = function (e) {
                        var target = e.target;
                        target.parentElement.children[0].setAttribute("style", "display:block");
                        target.parentElement.children[1].setAttribute("style", "display:block");
                        target.parentElement.children[2].setAttribute("style", "display:block");
                        target.parentElement.children[2].focus(); //获得输入框焦点
                        target.parentElement.children[2].select(); //默认选中输入框的内容
                        target.parentElement.children[3].setAttribute("style", "display:none");
                    }
                    // 点击确定
                    inputConfirm.onclick = function (e) {
                        var target = e.target;
                        // 暂存表格数据
                        var temp = target.parentElement.textContent;
                        // console.log(target.parentElement.textContent);
                        if (!HtmlUtil.isNumber(target.parentElement.children[2].value)) {
                            alert("请输入数字");
                            target.parentElement.children[2].value = temp;
                            // target.parentElement.children[2].focus();
                        } else {
                            target.parentElement.children[0].setAttribute("style", "display:none");
                            target.parentElement.children[1].setAttribute("style", "display:none");
                            target.parentElement.children[2].setAttribute("style", "display:none");
                            target.parentElement.children[3].setAttribute("style", "display:block");

                            var newData = {};
                            var sale = [];
                            // var table = e.target.parentElement.parentElement.parentElement;
                            var tr = e.target.parentElement.parentElement;
                            var inputData = tr.getElementsByClassName("inputData");
                            if (table.rows[0].cells[0].innerHTML == "商品") {
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
                            // console.log(newData);
                            storageNewData(newData);
                        }
                        // 输入数据之后重新渲染表格
                        renderTable(getData(sourceData));
                        tableDisplayOpt();
                    }
                    // 点击取消
                    inputCancel.onclick = function (e) {
                        var target = e.target;
                        var temp = target.parentElement.textContent;
                        target.parentElement.children[0].setAttribute("style", "display:none");
                        target.parentElement.children[1].setAttribute("style", "display:none");
                        target.parentElement.children[2].setAttribute("style", "display:none");
                        target.parentElement.children[3].setAttribute("style", "display:block");
                        target.parentElement.children[2].value = temp;
                    }
                    // 在输入框内监听按键按下
                    inputData.onkeydown = function (e) {
                        console.log(e.keyCode); //esc 27 enter 13
                        if (e.keyCode == "27") {
                            this.parentElement.children[0].setAttribute("style", "display:none");
                            this.parentElement.children[1].setAttribute("style", "display:none");
                            this.parentElement.children[2].setAttribute("style", "display:none");
                            this.parentElement.children[3].setAttribute("style", "display:block");
                            // this.parentElement.children[2].value = "";
                        }
                        if (e.keyCode == "13") {
                            if (!HtmlUtil.isNumber(target.parentElement.children[2].value)) {
                                alert("请输入数字");
                                // this.parentElement.children[2].value = "";
                                this.parentElement.children[2].focus();
                            } else {
                                this.parentElement.children[0].setAttribute("style", "display:none");
                                this.parentElement.children[1].setAttribute("style", "display:none");
                                this.parentElement.children[2].setAttribute("style", "display:none");
                                this.parentElement.children[3].setAttribute("style", "display:block");

                                var newData = {};
                                var sale = [];
                                // var table = e.target.parentElement.parentElement.parentElement;
                                var tr = e.target.parentElement.parentElement;
                                var inputData = tr.getElementsByClassName("inputData");
                                if (table.rows[0].cells[0].innerHTML == "商品") {
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
                                // console.log(newData);
                                storageNewData(newData);
                            }
                            // 输入数据之后重新渲染表格
                            renderTable(getData(sourceData));
                            tableDisplayOpt();
                        }
                    }
                    // 失去焦点，隐藏输入框和按钮
                    inputData.onblur = function (e) {
                        var target = e.target;
                        var temp = target.parentElement.textContent;
                        setTimeout(function () { //设置延迟，防止按钮按不到就消失了
                            if (e.target.parentElement.children[0].style.display == "block") {
                                target.parentElement.children[0].setAttribute("style", "display:none");
                            }
                            if (e.target.parentElement.children[1].style.display == "block") {
                                target.parentElement.children[1].setAttribute("style", "display:none");
                            }
                            if (e.target.parentElement.children[2].style.display == "block") {
                                target.parentElement.children[2].setAttribute("style", "display:none");
                            }
                            if (e.target.parentElement.children[3].style.display == "none") {
                                target.parentElement.children[3].setAttribute("style", "display:block");
                            }
                            target.parentElement.children[2].value = temp;
                        }, 266);
                    }
                    //---------------------------
                    // button.onclick = function (e) {
                    //     var newData = {};
                    //     var sale = [];
                    //     var table = e.target.parentElement.parentElement.parentElement;
                    //     var tr = e.target.parentElement.parentElement;
                    //     var inputData = tr.getElementsByTagName("input");

                    //     if (table.rows[0].cells[0].innerHTML == "商品") {
                    //         newData["product"] = tr.cells[0].innerHTML;
                    //         newData["region"] = tr.cells[1].innerHTML;
                    //         for (let i = 0; i < inputData.length; i++) {
                    //             sale.push(Number(inputData[i].value)); //输入值是字符串，转数字
                    //         }
                    //         newData["sale"] = sale;
                    //     } else {
                    //         newData["product"] = tr.cells[1].innerHTML;
                    //         newData["region"] = tr.cells[0].innerHTML;
                    //         for (let i = 0; i < inputData.length; i++) {
                    //             sale.push(Number(inputData[i].value));
                    //         }
                    //         newData["sale"] = sale;
                    //     }
                    //     // console.log(newData);
                    //     storageNewData(newData);
                    // }
                }
            }
        }
    }
}

// 表格显示调整，合并单元格
function tableDisplayOpt() {
    var table = document.getElementById("mytable");
    var regoinCheckedNum = getCheckedItem(regionArr).length; //此函数在getData.js
    var productCheckedNum = getCheckedItem(productArr).length;

    // 当商品选择了一个，地区选择了多个的时候，商品作为第一列，地区作为第二列，把商品列合并，留一个商品名称
    if (regoinCheckedNum > 1 && productCheckedNum == 1) {
        for (let i = 1; i <= regoinCheckedNum; i++) {
            if (i == 1) {
                table.rows[i].cells[0].setAttribute("rowspan", regoinCheckedNum);
            } else {
                table.rows[i].cells[0].setAttribute("style", "display:none");
            }
        }
    }
    //当地区选择了一个，商品选择了多个的时候，地区作为第一列，商品作为第二列，把地区列合并，留一个地区名称
    if (regoinCheckedNum == 1 && productCheckedNum > 1) {
        //交换第一列和第二列的数据
        for (let i = 0; i < table.rows.length; i++) {
            let temp;
            temp = table.rows[i].cells[0].innerHTML;
            table.rows[i].cells[0].innerHTML = table.rows[i].cells[1].innerHTML;
            table.rows[i].cells[1].innerHTML = temp;
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
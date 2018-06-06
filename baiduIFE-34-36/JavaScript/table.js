var tableHead = ["商品", "地区", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
var tableWrapper = document.getElementById("table-wrapper");


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

//获取数据
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
//渲染数据
function renderTable(data) {
    tableWrapper.innerHTML = ""; //清除上次的数据
    var table = document.createElement("table");
    tableWrapper.appendChild(table);
    var tr = document.createElement("tr");
    table.appendChild(tr);

    function setTableHead() {
        for (let i = 0; i < tableHead.length; i++) { //添加表头
            var th = document.createElement("th");
            th.innerHTML = tableHead[i];
            tr.appendChild(th);
        }
    }

    var regoinCheckedNum = getCheckedItem(regionArr).length;
    var productCheckedNum = getCheckedItem(productArr).length;
    //当商品选择了一个，地区选择了多个的时候，商品作为第一列，地区作为第二列，把商品列合并，留一个商品名称
    //代码复用问题，待优化，
    if (regoinCheckedNum > 1 && productCheckedNum == 1) {
        setTableHead();
        for (let i = 0; i < data.length; i++) {
            var tr = document.createElement("tr");
            table.appendChild(tr);
            for (x in data[i]) { //遍历对象的属性x
                //该合并的单元格行数等于地区数
                if (x == "product" && i == 0) {
                    var td = document.createElement("td");
                    td.setAttribute("rowspan", regoinCheckedNum)
                    td.innerHTML = data[i][x];
                    tr.appendChild(td);
                }
                if (x == "region") {
                    var td = document.createElement("td");
                    td.innerHTML = data[i][x];
                    tr.appendChild(td);
                }
                if (x == "sale") {
                    for (let j = 0; j < data[i][x].length; j++) { //data[i]对象的的第三个属性是数组，对齐进行遍历填充
                        var td = document.createElement("td");
                        td.innerHTML = data[i][x][j];
                        tr.appendChild(td);
                    }
                }
            }
        }
    }
    //当地区选择了一个，商品选择了多个的时候，地区作为第一列，商品作为第二列，把地区列合并，留一个地区名称
    if (regoinCheckedNum == 1 && productCheckedNum > 1) {
        var th = document.createElement("th"); //交换地区和商品的位置
        th.innerHTML = tableHead[1];
        tr.appendChild(th);
        var th = document.createElement("th");
        th.innerHTML = tableHead[0];
        tr.appendChild(th);
        for (let i = 2; i < tableHead.length; i++) { //单独添加表头
            var th = document.createElement("th");
            th.innerHTML = tableHead[i];
            tr.appendChild(th);
        }

        for (let i = 0; i < data.length; i++) {
            var tr = document.createElement("tr");
            table.appendChild(tr);
            // for ()
            for (x in data[i]) { //遍历对象的属性x
                //该合并的单元格行数等于商品数
                //由于交换了数据，应该在商品的区域合并单元格
                if (x == "product" && i == 0) {
                    var tdProduct = document.createElement("td");
                    tdProduct.setAttribute("rowspan", productCheckedNum)
                    tr.appendChild(tdProduct);
                    // tdProduct.innerHTML = data[i][x];
                }
                if (x == "product") {
                    var data1 = data[i][x];
                }
                if (x == "region") {
                    var tdRegion = document.createElement("td");
                    tr.appendChild(tdRegion);
                    var data2 = data[i][x];
                    // tdRegion.innerHTML = data[i][x];
                }
                if (x == "sale") {
                    for (let j = 0; j < data[i][x].length; j++) { //data[i]对象的的第三个属性是数组，对齐进行遍历填充
                        var td = document.createElement("td");
                        td.innerHTML = data[i][x][j];
                        tr.appendChild(td);
                    }
                }
            }
            //交换地区单元格和商品单元格的数据
            tdProduct.innerHTML = data2;
            tdRegion.innerHTML = data1;
        }
    }
    //当商品和地区都选择了多于一个，以商品为第一列，地区为第二列，商品列对同样的商品单元格进行合并
    if (regoinCheckedNum > 1 && productCheckedNum > 1) {
        setTableHead();
        for (let i = 0; i < data.length; i++) {
            var tr = document.createElement("tr");
            table.appendChild(tr);
            for (x in data[i]) { //遍历对象的属性x
                //地区个数等于该合并的单元格数，根据数据排列的规律，i不能被行数整除时，跳过该产品名称单元格
                if (x == "product" && i % regoinCheckedNum == 0) {
                    var td = document.createElement("td");
                    td.setAttribute("rowspan", regoinCheckedNum)
                    td.innerHTML = data[i][x];
                    tr.appendChild(td);
                }
                if (x == "region") {
                    var td = document.createElement("td");
                    td.innerHTML = data[i][x];
                    tr.appendChild(td);
                }
                if (x == "sale") {
                    for (let j = 0; j < data[i][x].length; j++) { //data[i]对象的的第三个属性是数组，对齐进行遍历填充
                        var td = document.createElement("td");
                        td.innerHTML = data[i][x][j];
                        tr.appendChild(td);
                    }
                }
            }
        }
    }
    if (regoinCheckedNum == 1 && productCheckedNum == 1) {
        setTableHead();
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
                        var td = document.createElement("td");
                        td.innerHTML = data[i][x][j];
                        tr.appendChild(td);
                    }
                }
            }
        }
    }
}
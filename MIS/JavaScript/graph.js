//???好像不对。怎么搞
var graph = {
    graphData: new Array(),
    table: document.getElementById("table-wrapper"),
    // 相关各种定义
    drawGraph: function (data) {
        drawMultiBarGraph(data);
        drawMultiLineGraph(data);
    },
    setData: function () {
        var barWrapper = document.getElementById("bar-wrapper");
        var lineWrapper = document.getElementById("line-wrapper");
        this.table.onmouseover = function (e) {
            var storage = window.localStorage;
            var newSourceData;
            var data = [];
            target = e.target;
            var tr = target.parentElement; //当前hover元素的父元素
            var tr2 = target.parentElement.parentElement; //加一种情况，父元素的父元素也可能是tr
            // console.log(tr2);
            if (tr.cells || tr2.cells) {
                if (tr2.cells) { //判tr2是不是表格的行tr
                    tr = tr2;
                }
                for (let i = 0; i < sourceData.length; i++) {
                    if (sourceData[i].region == tr.cells[1].innerHTML && sourceData[i].product == tr.cells[0].innerHTML) {
                        data.push(sourceData[i]);
                    }
                    //根据表格一二列从数据文件中筛选数据，两种情况，上面是种商品在前地区在后。下面的是地区在前商品在后
                    if (sourceData[i].region == tr.cells[0].innerHTML && sourceData[i].product == tr.cells[1].innerHTML) {
                        data.push(sourceData[i]);
                    }
                }
                // 判断LocalStorage中是否有数据，从LocalStorage中读取数据，判断是否有相同数据，有就替换js文件ife31data中得到的数据。
                if (storage.getItem("newSourceData")) {
                    let json = storage.getItem("newSourceData")
                    newSourceData = JSON.parse(json);
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < newSourceData.length; j++) {
                            if (data[i].region == newSourceData[j].region && data[i].product == newSourceData[j].product) {
                                data[i] = newSourceData[j]; //有相同的数据，用本地存储的数据替换
                            }
                        }
                    }
                }
                //当前鼠标划过的表格行不是数字就不画图
                if (HtmlUtil.isNumber(tr.cells[2].textContent)) {
                    barWrapper.innerHTML = ""; //重新画图
                    lineWrapper.innerHTML = "";
                    drawMultiBarGraph(data);
                    drawMultiLineGraph(data);
                }
            }
        }
    }
}
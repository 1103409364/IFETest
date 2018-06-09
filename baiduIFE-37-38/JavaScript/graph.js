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
            var data = [];
            target = e.target;
            var tr = target.parentElement; //当前hover元素的父元素
            if (tr.cells) {
                for (let i = 0; i < sourceData.length; i++) {
                    if (sourceData[i].region == tr.cells[1].innerHTML && sourceData[i].product == tr.cells[0].innerHTML) {
                        data.push(sourceData[i]);
                    }
                    //根据表格一二列从数据文件中筛选数据，两种情况，上面是种商品在前地区在后。下面的是地区在前商品在后
                    if (sourceData[i].region == tr.cells[0].innerHTML && sourceData[i].product == tr.cells[1].innerHTML) {
                        data.push(sourceData[i]);
                    }
                }
                console.log(data);

                if (HtmlUtil.isNumber(tr.cells[2].innerHTML)) { //当前hover的表格行不含数字就不画图
                    barWrapper.innerHTML = ""; //重新画图
                    lineWrapper.innerHTML = "";
                    drawMultiBarGraph(data);
                    drawMultiLineGraph(data);
                }
            }
        }
    }
}
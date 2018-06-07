//???好像不对。怎么搞
var graph = {
    graphData: new Array(),
    table: document.getElementById("table-wrapper"),
    // 相关各种定义
    drawGraph: function (data) {
        drawBarGraph(data);
        drawLineGraph(data);
    },
    setData: function () {
        var barWrapper = document.getElementById("bar-wrapper");
        var lineWrapper = document.getElementById("line-wrapper");
        this.table.onmouseover = function (e) {
            var data = [];
            target = e.target;
            var tr = target.parentElement;
            if (tr.cells) {
                for (let i = 0; i < tr.cells.length; i++) {
                    // console.log(tr.cells.length);
                    if (HtmlUtil.isNumber(tr.cells[i].innerHTML)) { //过滤非数字
                        data.push(tr.cells[i].innerHTML);
                    }
                }
                if (HtmlUtil.isNumber(tr.cells[2].innerHTML)) { //当前hover的表格行不含数字就不画图
                    barWrapper.innerHTML = ""; //重新画图
                    lineWrapper.innerHTML = "";
                    drawBarGraph(data);
                    drawLineGraph(data);
                }
            }
        }
    }
}
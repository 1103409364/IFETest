// 绘制多组柱状图,参数是对象数组
var drawMultiBarGraph = function (data) {
    // 颜色数组
    var colorArr = ["#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#ff7c7c", "#9287e7"];
    var barWrapper = document.getElementById("bar-wrapper");
    var newData = [],
        maxValueArr = [];

    barWrapper.innerHTML = ""; //清除画布

    for (let i = 0; i < data.length; i++) {
        //从每一组数据中获得最大值，放入maxValueArr
        maxValueArr.push(HtmlUtil.maxValue(data[i].sale));
        newData.push(data[i].sale); //获取数据对象中的sale
    }

    //最大值中的最大值，就是几组数据中的最大值，用于确定y轴分度值
    var maxY = HtmlUtil.maxValue(maxValueArr);
    var maxValue = Math.floor(maxY * 1.2); //y轴最大范围
    //画坐标轴，返回ctx对象
    ctx = drawAxis(barWrapper, maxValue);
    // 开始画柱状图， 加0.5防止线条发虚
    for (let j = 0; j < newData.length; j++) {
        for (let i = 0; i < 12; i++) {
            var step = 50;
            let heightData = newData[j][i] / maxValue * 210
            let y = 270.5 - heightData;
            let x, widthX;
            if (newData.length > 1) {
                //不同数据设置不同的颜色
                // rect.setAttribute("style", "fill:" + colorArr[j % 6]);
                x = 35.5 + step * i;
                widthX = 40 / newData.length;
                // ctx.strokeStyle = colorArr[j % 6];
                ctx.fillStyle = colorArr[j % 6];
            } else {
                // rect.setAttribute("style", "fill:" + colorArr[2]);
                x = 40.5 + step * i;
                widthX = 30 / newData.length;
                // ctx.strokeStyle = colorArr[2];
                ctx.fillStyle = colorArr[2];
            }
            ctx.fillRect(x, y, widthX, heightData)
            ctx.stroke();
            // let cx = 630 - j * 50;
            // rect.setAttribute("x", x + j * widthX);
            // rect.setAttribute("y", y);
            // rect.setAttribute("width", widthX);
            // rect.setAttribute("height", heightData);
            // svgDom.appendChild(rect);
        }
    }
}
function drawMultiBarGraph(data) {
    var colorArr = ["#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#ff7c7c", "#9287e7"];

    var newData = [],
        maxValueArr = [];
    for (let i = 0; i < data.length; i++) {
        //从每一组数据中获得最大值，放入maxValueArr
        maxValueArr.push(HtmlUtil.maxValue(data[i].sale));
        newData.push(data[i].sale); //获取数据对象中的sale
    }


    var maxY = HtmlUtil.maxValue(maxValueArr); //最大值中的最大值，就是几组数据中的最大值
    // console.log(maxY);
    var maxValue = Math.floor(maxY * 1.2); //y轴最大范围
    var xmlns = "http://www.w3.org/2000/svg";
    //画坐标轴，返回svg对象
    var svgDom = drawAxisBar(maxValue);

    // 开始画柱状图
    for (let j = 0; j < newData.length; j++) {
        for (let i = 0; i < 12; i++) {
            let heightData = newData[j][i] / maxValue * 210;
            let y = 270 - heightData;
            let x, widthX;
            let rect = document.createElementNS(xmlns, "rect");
            // let legend = document.createElementNS(xmlns, "circle"); //图例
            if (newData.length > 1) {
                //不同数据设置不同的颜色
                // legend.setAttribute("style", "fill:" + colorArr[j % 6]);
                rect.setAttribute("style", "fill:" + colorArr[j % 6]);
                x = 35 + 50 * i;
                widthX = 40 / newData.length;
            } else {
                // legend.setAttribute("style", "fill:" + colorArr[2]);
                rect.setAttribute("style", "fill:" + colorArr[2]);
                x = 40 + 50 * i;
                widthX = 30 / newData.length;
            }
            let cx = 630 - j * 50;
            // legend.setAttribute("cx", cx);
            // legend.setAttribute("cy", "30");
            // legend.setAttribute("r", "5");
            rect.setAttribute("x", x + j * widthX);
            rect.setAttribute("y", y);
            rect.setAttribute("width", widthX);
            rect.setAttribute("height", heightData);
            svgDom.appendChild(rect);
            // svgDom.appendChild(legend);
        }
    }
}
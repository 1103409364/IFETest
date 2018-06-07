function drawBarGraph(data) {
    var barWrapper = document.getElementById("bar-wrapper");
    // 画布上的坐标并未对应网页里的像素，在绘制这个1px的横线，它会把这个1px劈成两半，然后显示器根据你传来的东西会显示成模糊结果。
    // 解决办法：如果横线，那就在y值上加个0.5。如果竖线，那就在x值上加个0.5。
    var maxY = HtmlUtil.maxValue(data); //210 最大值
    var maxValue = Math.floor(maxY * 1.2); //设置一个合适的Y轴最大坐标值，显示最大值
    // 创建svg元素需要传入命名空间，其他与创建HTML元素类似
    var xmlns = "http://www.w3.org/2000/svg";
    var svgDom = document.createElementNS(xmlns, "svg");
    svgDom.setAttribute("height", "330");
    svgDom.setAttribute("width", "650");
    barWrapper.appendChild(svgDom);
    // y轴最大高度210,最大值为300
    var lineY = document.createElementNS(xmlns, "line")
    lineY.setAttribute("x1", "30.5");
    lineY.setAttribute("y1", "60");
    lineY.setAttribute("x2", "30.5");
    lineY.setAttribute("y2", "270");
    lineY.setAttribute("style", "stroke:black");
    svgDom.appendChild(lineY);
    // y轴刻度，间距35px,分度值50,
    for (let i = 0; i < 6; i++) {
        let y = 60.5 + 35 * i;
        let valueY = maxValue * (6 - i + 1) / 6;
        var scaleY = document.createElementNS(xmlns, "line")
        scaleY.setAttribute("x1", "30");
        scaleY.setAttribute("y1", y);
        scaleY.setAttribute("x2", "630");
        scaleY.setAttribute("y2", y);
        scaleY.setAttribute("style", "stroke:#dbdbdb;");
        svgDom.appendChild(scaleY);
        var scaleY = document.createElementNS(xmlns, "line")
        scaleY.setAttribute("x1", "30");
        scaleY.setAttribute("y1", y);
        scaleY.setAttribute("x2", "25");
        scaleY.setAttribute("y2", y);
        scaleY.setAttribute("style", "stroke:#000;");
        svgDom.appendChild(scaleY);
        var textY = document.createElementNS(xmlns, "text");
        textY.setAttribute("x", 0);
        textY.setAttribute("y", y + 5);
        textY.setAttribute("style", "font-size:13;font-family:微软雅黑")
        textY.innerHTML = valueY;
        svgDom.appendChild(textY);
    }

    var lineX = document.createElementNS(xmlns, "line")
    lineX.setAttribute("x1", "30");
    lineX.setAttribute("y1", "270.5");
    lineX.setAttribute("x2", "630");
    lineX.setAttribute("y2", "270.5");
    lineX.setAttribute("style", "stroke:black;");
    svgDom.appendChild(lineX);
    // x轴刻度，分度值50
    for (let i = 1; i < 13; i++) {
        let x = 30.5 + 50 * i;
        let month = (i) + "月";
        var scaleY = document.createElementNS(xmlns, "line");
        scaleY.setAttribute("x1", x);
        scaleY.setAttribute("y1", "270");
        scaleY.setAttribute("x2", x);
        scaleY.setAttribute("y2", "275");
        scaleY.setAttribute("style", "stroke:black");
        svgDom.appendChild(scaleY);
        var textY = document.createElementNS(xmlns, "text");
        textY.setAttribute("x", x - 38);
        textY.setAttribute("y", "290");
        textY.setAttribute("style", "font-size:13;font-family:微软雅黑")
        textY.innerHTML = month;
        svgDom.appendChild(textY);
    }
    for (let i = 0; i < 12; i++) {
        let heightData = data[i] / maxValue * 210;
        let y = 270 - heightData;
        let x = 40 + 50 * i;
        var rect = document.createElementNS(xmlns, "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", "30");
        rect.setAttribute("height", heightData);
        rect.setAttribute("style", "fill:#5bc49f");
        svgDom.appendChild(rect);
    }
}
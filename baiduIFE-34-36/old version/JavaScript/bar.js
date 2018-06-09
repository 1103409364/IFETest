function drawBarGraph(data) {
    var barWrapper = document.getElementById("bar-wrapper");
    // 画布上的坐标并未对应网页里的像素，在绘制这个1px的横线，它会把这个1px劈成两半，然后显示器根据你传来的东西会显示成模糊结果。
    // 解决办法：如果横线，那就在y值上加个0.5。如果竖线，那就在x值上加个0.5。
    var maxY = HtmlUtil.maxValue(data); //210 最大值
    var maxValue = Math.floor(maxY * 1.2); //设置一个合适的Y轴最大坐标值，显示最大值
    // 创建svg元素需要传入命名空间，其他与创建HTML元素类似
    var xmlns = "http://www.w3.org/2000/svg";
    //画坐标轴，返回svg对象
    var svgDom = drawAxisBar(maxValue);

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
//line与multiLine可以合并，参数要一样
function drawLineGraph(data) {
    // var barWrapper = document.getElementById("line-wrapper");
    var maxY = HtmlUtil.maxValue(data); //最大值
    var maxValue = Math.floor(maxY * 1.2); //y轴最大范围
    ctx = drawAxis(maxValue);
    for (let i = 0; i < 12; i++) {
        let heightData1 = data[i] / maxValue * 210;
        let heightData2 = data[i + 1] / maxValue * 210;
        let x1 = 30.5 + 50 * i;
        let x2 = 30.5 + 50 * (i + 1);
        let y1 = 270.5 - heightData1;
        let y2 = 270.5 - heightData2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "#5bc49f";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x1, y1, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#5bc49f";
        ctx.fill();
    }
}
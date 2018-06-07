function drawLineGraph(data) {
    var barWrapper = document.getElementById("line-wrapper");
    var maxY = HtmlUtil.maxValue(data); //210 最大值
    var maxValue = Math.floor(maxY * 1.2); //设置一个合适的Y轴最大坐标值,显示最大值
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "line");
    canvas.setAttribute("width", "650");
    canvas.setAttribute("height", "330");
    barWrapper.appendChild(canvas);

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.save();
        ctx.beginPath(); //添加ctx.beginPath();否则xy轴颜色会被覆盖
        ctx.moveTo(30.5, 0);
        ctx.lineTo(30.5, 210.5);
        ctx.lineTo(630.5, 210.5);
        ctx.stroke();
        // y轴刻度
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            let y = 0.5 + 35 * i;
            ctx.moveTo(30.5, y);
            ctx.lineTo(630.5, y);
            ctx.strokeStyle = "#dbdbdb";
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(30.5, y);
            ctx.lineTo(25, y);
            ctx.strokeStyle = "#000";
            ctx.stroke();
        }
        // x轴刻度
        ctx.restore();
        for (let i = 0; i < 12; i++) {
            ctx.beginPath();
            let x = 30.5 + 50 * i;
            ctx.moveTo(x, 210.);
            ctx.lineTo(x, 215);
            ctx.stroke();
        }

        for (let i = 0; i < 12; i++) {
            let heightData1 = data[i] / maxValue * 210;
            let heightData2 = data[i + 1] / maxValue * 210;
            let x1 = 30.5 + 50 * i;
            let x2 = 30.5 + 50 * (i + 1);
            let y1 = 210.5 - heightData1;
            let y2 = 210.5 - heightData2;
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
}
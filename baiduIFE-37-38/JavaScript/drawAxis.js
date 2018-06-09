//折线图的坐标轴
function drawAxis(maxValue) {
    var lineWrapper = document.getElementById("line-wrapper");
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "line");
    canvas.setAttribute("width", "650");
    canvas.setAttribute("height", "330");
    lineWrapper.appendChild(canvas);

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.save();
        ctx.beginPath(); //添加ctx.beginPath();否则xy轴颜色会被覆盖
        ctx.moveTo(30.5, 60);
        ctx.lineTo(30.5, 270.5);
        ctx.lineTo(630.5, 270.5);
        ctx.stroke();
        // y轴刻度
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            let y = 60.5 + 35 * i;
            let valueY = maxValue * (6 - i) / 6;
            ctx.moveTo(30.5, y);
            ctx.lineTo(630.5, y);
            ctx.strokeStyle = "#dbdbdb";
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(30.5, y);
            ctx.lineTo(25, y);
            ctx.strokeStyle = "#000";
            ctx.stroke();
            ctx.font = "12px 微软雅黑";
            ctx.fillText(valueY, 0, y + 5);
        }
        // x轴刻度
        ctx.restore();
        for (let i = 0; i < 12; i++) {
            ctx.beginPath();
            let x = 30.5 + 50 * i;
            let month = (i + 1) + "月";
            ctx.moveTo(x, 270.6);
            ctx.lineTo(x, 275);
            ctx.stroke();
            ctx.font = "13px 微软雅黑";
            ctx.fillText(month, x - 10, 290);
        }
    }
    return ctx;
}
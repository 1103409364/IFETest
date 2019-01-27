//画坐标轴 canvas版 画布尺寸x 650 y 330
var drawAxis = function (wrapper, maxValue) {
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "line");
    canvas.setAttribute("width", "650");
    canvas.setAttribute("height", "330");
    wrapper.appendChild(canvas);

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.save();
        //添加ctx.beginPath();否则xy轴颜色会被覆盖.beginPath()告诉画布：“我要开始画草稿了，请把之前的都清除掉。”
        ctx.beginPath();
        // 画个L作为坐标轴
        ctx.moveTo(30.5, 60);
        // y轴
        ctx.lineTo(30.5, 270.5);
        // x轴
        ctx.lineTo(630.5, 270.5);
        ctx.stroke();
        // 画y轴刻度
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
            ctx.lineTo(35, y);
            ctx.strokeStyle = "#000";
            ctx.stroke();
            ctx.font = "12px 微软雅黑";
            // y轴文本右对齐
            ctx.textAlign = "right";
            ctx.fillText(Math.round(valueY), 28, y + 5); //四舍五入
        }
        // x轴刻度
        ctx.restore();
        for (let i = 0; i < 12; i++) {
            ctx.beginPath();
            // 分度值
            var step = 50;
            // 刻度右移动25
            let x = 55.5 + step * i;
            let month = (i + 1) + "月";
            ctx.moveTo(x, 270.6);
            ctx.lineTo(x, 275);
            ctx.stroke();
            ctx.font = "13px 微软雅黑";
            // x轴文本居中对齐
            ctx.textAlign = "center";
            ctx.fillText(month, x, 290);
        }
    }
    return ctx;
}
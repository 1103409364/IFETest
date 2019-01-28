// 初始化折线图和柱状图
var initialGraph = function (data) {
    // 颜色数组
    var colorArr = ["#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#ff7c7c", "#9287e7"];
    // 获取柱状图容器
    var barWrapper = document.getElementById("bar-wrapper");
    // 获取折线图容器
    var lineWrapper = document.getElementById("line-wrapper");
    var newData = [],
        maxValueArr = [];

    for (let i = 0; i < data.length; i++) {
        //从每一组数据中获得最大值，放入maxValueArr
        maxValueArr.push(HtmlUtil.maxValue(data[i].sale));
        newData.push(data[i].sale); //获取数据对象中的sale
    }

    //最大值中的最大值，就是几组数据中的最大值，用于确定y轴分度值
    var maxY = HtmlUtil.maxValue(maxValueArr);
    //y值范围，控制图表的最大值的高度，留10%空白
    var maxValue = Math.floor(maxY * 1.1);

    drawMultiBarGraph(colorArr, barWrapper, newData, maxValue);
    drawMultiLineGraph(colorArr, lineWrapper, newData, maxValue);
}

// 绘制多组柱状图,参数是对象数组
var drawMultiBarGraph = function (colorArr, barWrapper, newData, maxValue) {
    barWrapper.innerHTML = ""; //清除画布
    ctx = drawAxis(barWrapper, maxValue);

    for (let j = 0; j < newData.length; j++) {
        for (let i = 0; i < 12; i++) {
            var step = 50;
            // y轴高度240
            let heightData = newData[j][i] / maxValue * 210
            let y = 270 - heightData;
            let x, widthX;
            if (newData.length > 1) {
                //不同数据设置不同的颜色
                x = 35 + step * i;
                widthX = 40 / newData.length;
                ctx.fillStyle = colorArr[j % 6];
            } else {
                x = 40 + step * i;
                widthX = 30 / newData.length;
                ctx.fillStyle = colorArr[2];
            }
            x = x + j * widthX;
            ctx.fillRect(x, y, widthX, heightData)
            ctx.stroke();
        }
    }
}

//绘制多组折线图，参数是对象数组
var drawMultiLineGraph = function (colorArr, lineWrapper, newData, maxValue) {
    lineWrapper.innerHTML = ""; //清除画布

    //画坐标轴，返回ctx对象
    ctx = drawAxis(lineWrapper, maxValue);
    // 开始画折线图，加0.5防止线条发虚
    for (let j = 0; j < newData.length; j++) {
        for (let i = 0; i < 12; i++) {
            var step = 50;
            //当前点
            let heightData1 = newData[j][i] / maxValue * 210;
            //下一个点
            let heightData2 = newData[j][i + 1] / maxValue * 210;
            // 画当前点到下一个点的线，原位置30.5右移25
            let x1 = 55.5 + step * i;
            let x2 = 55.5 + step * (i + 1);
            let y1 = 270.5 - heightData1;
            let y2 = 270.5 - heightData2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            //只有一组数据的时候，用默认颜色，否则遍历数组中的颜色
            if (newData.length > 1) {
                ctx.strokeStyle = colorArr[j % 6];
                ctx.fillStyle = colorArr[j % 6];

            } else {
                ctx.strokeStyle = colorArr[2];
                ctx.fillStyle = colorArr[2];
            }
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x1, y1, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

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
        ctx.moveTo(30.5, 40);
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









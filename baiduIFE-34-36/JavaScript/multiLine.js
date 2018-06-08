//绘制多条折线图
function drawMultiLineGraph(data) {
    // 颜色数组
    var colorArr = ["#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#ff7c7c", "#9287e7"];
    var lineWrapper = document.getElementById("line-wrapper");
    // barWrapper.innerHTML = ""; //重新画图
    lineWrapper.innerHTML = "";
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

    ctx = drawAxis(maxValue);

    for (let j = 0; j < newData.length; j++) {
        for (let i = 0; i < 12; i++) {
            //当前点
            let heightData1 = newData[j][i] / maxValue * 210;
            //下一个点
            let heightData2 = newData[j][i + 1] / maxValue * 210;
            let x1 = 30.5 + 50 * i;
            let x2 = 30.5 + 50 * (i + 1);
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
            ctx.arc(x1, y1, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
const img = new Image();
// canvas1
let canvasBox1 = "";
// canvas2
let canvasBox2 = "";
let ctxOne = "";
let ctxTwo = "";
let canvasele = "";

//创建圆
const drawYuan = (newDrawType) => {
  drawType = newDrawType;
  ctxOne.clearRect(0, 0, canvasBox1.width, canvasBox1.height);
  ctxTwo.clearRect(0, 0, canvasBox2.width, canvasBox2.height);
  ctxOne.fillStyle = canvasele.fillStyle;
  ctxOne.beginPath();
  ctxOne.arc(canvasele.x0, canvasele.y0, canvasele.r, 0, 2 * Math.PI, true);
  ctxOne.fill();
};

let drawType = "";
const btnDrawFun = (drawType, canvasDom, canvas2Dom) => {
  if (drawType === "矩形") {
    initCanvas(canvasDom, canvas2Dom).drawRectangle(drawType);
  } else if (drawType === "圆形") {
    initCanvas(canvasDom, canvas2Dom).drawCircle(drawType);
  } else if (drawType === "三角形") {
    initCanvas(canvasDom, canvas2Dom).drawTriangle(drawType);
  } else if (drawType === "直线") {
    initCanvas(canvasDom, canvas2Dom).drawLine(drawType);
  }
};

//绘制控制器
const contorlRect = (removeX, removeY) => {
  const path = new Path2D();
  path.rect(removeX, removeY, 12, 12);
  path.fillStyle = "black";
  return path;
};

const initCanvas = (canvasDom, canvas2Dom, value) => {
  if (canvasDom) {
    const canvasEle = {
      x0: 250,
      y0: 120,
      r: 50,
      rectangleWidth: 100,
      rectangleHeight: 100,
      fillStyle: value,
    };
    canvasele = canvasEle;
    let canvas = canvasDom;
    let ctx = canvas.getContext("2d");
    canvasBox1 = canvas;
    ctxOne = canvas.getContext("2d");
    let canvas2 = null;
    let ctx2 = null;

    if (canvas2Dom) {
      canvas2 = canvas2Dom;
      ctx2 = canvas2.getContext("2d");
      ctxTwo = canvas2.getContext("2d");
      canvasBox2 = canvas2;
    }

    //画矩形
    const drawRectangle = (newDrawType) => {
      drawType = newDrawType;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
      ctx.fillStyle = canvasEle.fillStyle;
      ctx.fillRect(
        canvasEle.x0 - 50,
        canvasEle.y0 - 50,
        canvasEle.rectangleWidth,
        canvasEle.rectangleHeight
      );
      ctx.fill();
    };
    //画三角形
    const drawTriangle = (newDrawType) => {
      drawType = newDrawType;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
      ctx.fillStyle = canvasEle.fillStyle;
      ctx.beginPath();
      ctx.moveTo(150, 20);
      ctx.lineTo(150, 120);
      ctx.lineTo(250, 20);
      ctx.fill();
    };
    //画线
    const drawLine = (
      newDrawType,
      lineWidthValue,
      checkedValue,
      joinValue,
      lineDashA,
      lineDashB,
      lineDashOffset
    ) => {
      drawType = newDrawType;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
      ctx.lineCap = checkedValue;
      ctx.lineWidth = lineWidthValue;
      ctx.lineJoin = joinValue;
      ctx.setLineDash([lineDashA, lineDashB]);
      ctx.lineDashOffset = -lineDashOffset;
      ctx.beginPath();
      ctx.moveTo(150, 20);
      ctx.lineTo(150, 120);
      ctx.lineTo(200, 120);
      ctx.lineTo(200, 200);
      ctx.stroke();
    };

    //添加文本
    const drawText = (newDrawType, writeText) => {
      drawType = newDrawType;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
      ctx.font = `30px 微软雅黑`;
      ctx.fillText(writeText, canvasEle.x0, canvasEle.y0);
    };

    //修改文本字体
    const changeTextSize = (
      newDrawType,
      writeText,
      fontSize,
      wordType,
      textValue,
      textQi
    ) => {
      drawType = newDrawType;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
      ctx.font = `${fontSize}px ${wordType}`;
      ctx.textAlign = textValue;
      ctx.direction = textQi;
      ctx.fillText(writeText, canvasEle.x0, canvasEle.y0);
    };
    //画边框
    const drawBorder = (removeX, removeY, rool, distance) => {
      ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
      let imgW = 200;
      let imgH = 200;
      imgW -= distance / 2 || 0;
      imgH -= distance / 2 || 0;
      const rot = rool * 3.6;
      ctx2.save();
      ctx2.translate(removeX + 100, removeY + 100);
      ctx2.rotate((rot * Math.PI) / 180);
      ctx2.translate(-removeX - 100, -removeY - 100);
      ctx2.moveTo(removeX + imgW / 2, removeY);
      ctx2.lineTo(removeX + imgW / 2, removeY - 36);
      ctx2.rect(removeX, removeY, imgW, imgH);
      ctx2.lineWidth = 3;
      ctx2.stroke();
      ctx2.beginPath();
      const r1 = contorlRect(removeX + imgW / 2 - 6, removeY - 36);
      const r2 = contorlRect(removeX - 12, removeY - 12);
      const r3 = contorlRect(removeX + imgW / 2 - 6, removeY - 12);
      const r4 = contorlRect(removeX + imgW, removeY - 12);
      const r5 = contorlRect(removeX - 12, removeY + imgH / 2 - 6);
      const r6 = contorlRect(removeX + imgW, removeY + imgH / 2 - 6);
      const r7 = contorlRect(removeX - 12, removeY + imgH);
      const r8 = contorlRect(removeX + imgW / 2 - 6, removeY + imgH);
      const r9 = contorlRect(removeX + imgW, removeY + imgH);
      ctx2.fill(r1);
      ctx2.fill(r2);
      ctx2.fill(r3);
      ctx2.fill(r4);
      ctx2.fill(r5);
      ctx2.fill(r6);
      ctx2.fill(r7);
      ctx2.fill(r8);
      ctx2.fill(r9);
      ctx2.closePath();
      ctx2.restore();
    };

    //判断是否点击到图像内部
    const isPointInImage = (point, Image) => {
      const [touchX, touchY] = point;
      const [[x1, y1], [x2, y2], [x4, y4], [x3, y3]] = Image;
      const v1 = [x1 - touchX, y1 - touchY];
      const v2 = [x2 - touchX, y2 - touchY];
      const v3 = [x3 - touchX, y3 - touchY];
      const v4 = [x4 - touchX, y4 - touchY];
      if (
        v1[0] * v2[1] - v2[0] * v1[1] > 0 &&
        v2[0] * v4[1] - v4[0] * v2[1] > 0 &&
        v4[0] * v3[1] - v3[0] * v4[1] > 0 &&
        v3[0] * v1[1] - v1[0] * v3[1] > 0
      ) {
        return true;
      }
      return false;
    };

    //获取像素点
    const pick = (event, divDom) => {
      const x = event.clientX - 545;
      const y = event.clientY - 160;
      const pixel = ctx.getImageData(x, y, 1, 1);
      const data = pixel.data;
      const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
      if (divDom) {
        divDom.style.background = rgba;
      }
    };

    //贝塞尔曲线
    const drawCurveTo = (newDrawType, lineWidthValue) => {
      drawType = newDrawType;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
      ctx.beginPath();
      ctx.lineWidth = lineWidthValue;
      ctx.moveTo(75, 25);
      if (newDrawType === "二次") {
        ctx.quadraticCurveTo(25, 25, 25, 62.5);
        ctx.quadraticCurveTo(25, 100, 50, 100);
        ctx.quadraticCurveTo(50, 120, 30, 125);
      } else if (newDrawType === "三次") {
        ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
        ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
      }
      ctx.stroke();
    };
    //改变颜色
    const changeColor = (value, value2) => {
      const scale = value2 / 50;
      ctx.clearRect(0, 0, canvasDom.width * scale, canvasDom.height * scale);
      ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
      ctx.fillStyle = value;
      ctx.beginPath();
      if (drawType === "矩形") {
        ctx.fillRect(
          canvasEle.x0 - 50,
          canvasEle.y0 - 50,
          canvasEle.rectangleWidth * scale,
          canvasEle.rectangleHeight * scale
        );
      } else if (drawType === "圆形") {
        ctx.arc(
          canvasEle.x0,
          canvasEle.y0,
          canvasEle.r * scale,
          0,
          2 * Math.PI,
          true
        );
      } else if (drawType === "三角形") {
        ctx.moveTo(150 * scale, 20 * scale);
        ctx.lineTo(150 * scale, 120 * scale);
        ctx.lineTo(250 * scale, 20 * scale);
      }
      ctx.fill();
    };
    //改变大小
    const changeSize = (value2) => {
      const scale = value2 / 50;
      //矩形
      if (drawType === "矩形") {
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.beginPath();
        ctx.fillRect(
          canvasEle.x0 - 50,
          canvasEle.y0 - 50,
          canvasEle.rectangleWidth * scale,
          canvasEle.rectangleHeight * scale
        );
        ctx.fill();
      }
      if (drawType === "圆形") {
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.beginPath();
        ctx.arc(
          canvasEle.x0,
          canvasEle.y0,
          canvasEle.r * scale,
          0,
          2 * Math.PI,
          true
        );
        ctx.fill();
      }
      if (drawType === "三角形") {
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.beginPath();
        ctx.moveTo(150 * scale, 20 * scale);
        ctx.lineTo(150 * scale, 120 * scale);
        ctx.lineTo(250 * scale, 20 * scale);
        ctx.fill();
      }
      if (drawType === "直线") {
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.beginPath();
        ctx.moveTo(150 * scale, 20 * scale);
        ctx.lineTo(150 * scale, 120 * scale);
        ctx.lineTo(200 * scale, 120 * scale);
        ctx.lineTo(200 * scale, 200 * scale);
        ctx.stroke();
      }
    };
    // 阴影
    const shadow = (value5, value2, valueX, valueY, valueColor) => {
      const scale = value2 / 50;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
      ctx.shadowOffsetX = valueX;
      ctx.shadowOffsetY = valueY;
      ctx.shadowBlur = value5;
      ctx.shadowColor = valueColor;
      if (drawType === "矩形") {
        ctx.fillRect(
          canvasEle.x0 - 50,
          canvasEle.y0 - 50,
          canvasEle.rectangleWidth * scale,
          canvasEle.rectangleHeight * scale
        );
      }
      if (drawType === "圆形") {
        console.log(drawType, 11);
        ctx.arc(
          canvasEle.x0,
          canvasEle.y0,
          canvasEle.r * scale,
          0,
          2 * Math.PI,
          true
        );
        ctx.fill();
      }
      if (drawType === "三角形") {
        ctx.moveTo(150 * scale, 20 * scale);
        ctx.lineTo(150 * scale, 120 * scale);
        ctx.lineTo(250 * scale, 20 * scale);
        ctx.fill();
      }
      if (drawType === "直线") {
        ctx.moveTo(150 * scale, 20 * scale);
        ctx.lineTo(150 * scale, 120 * scale);
        ctx.lineTo(200 * scale, 120 * scale);
        ctx.lineTo(200 * scale, 200 * scale);
        ctx.stroke();
      }
    };
    //透明度
    const changeOpacity = (value3, value2) => {
      ctx.globalAlpha = value3 / 100;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
      const scale = value2 / 50;
      if (drawType === "矩形") {
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.fillRect(
          canvasEle.x0 - 50,
          canvasEle.y0 - 50,
          canvasEle.rectangleWidth * scale,
          canvasEle.rectangleHeight * scale
        );
        ctx.closePath();
        ctx.fill();
      }
      if (drawType === "圆形") {
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.beginPath();
        ctx.arc(
          canvasEle.x0,
          canvasEle.y0,
          canvasEle.r * scale,
          0,
          2 * Math.PI,
          true
        );
        ctx.fill();
      }
      if (drawType === "三角形") {
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.beginPath();
        ctx.moveTo(150 * scale, 20 * scale);
        ctx.lineTo(150 * scale, 120 * scale);
        ctx.lineTo(250 * scale, 20 * scale);
        ctx.fill();
      }
      if (drawType === "直线") {
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.beginPath();
        ctx.moveTo(150 * scale, 20 * scale);
        ctx.lineTo(150 * scale, 120 * scale);
        ctx.lineTo(200 * scale, 120 * scale);
        ctx.lineTo(200 * scale, 200 * scale);
        ctx.stroke();
      }
    };

    //引入图片
    const liImage = (
      newDrawType,
      imgUrl,
      cWidth,
      cHeight,
      x,
      y,
      removeX,
      removeY
    ) => {
      drawType = newDrawType;
      img.crossOrigin = "anonymous";
      img.src = imgUrl;

      img.onload = () => {
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        ctx.save();
        ctx.beginPath();
        ctx.rect(x * 10, y * 10, cWidth * 10, cHeight * 10);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.lineWidth = 1;
        if (removeX === undefined && removeY === undefined) {
          ctx.drawImage(img, 0, 0, 200, 200);
        } else {
          ctx.drawImage(img, removeX, removeY, 200, 200);
        }
        ctx.restore();
      };
      // https://cdn1.mihuiai.com/media/images/5ee5fd5a-f112-4b6b-b742-d58efeaa0775_thumb.png
    };

    //旋转
    const rotateImage = (
      rot,
      value2,
      removeX,
      removeY,
      imgWidth,
      imgHeight
    ) => {
      const scale = value2 / 50;
      const imgW = imgWidth;
      const imgH = imgHeight;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
      if (drawType === "矩形") {
        ctx.rotate((rot * Math.PI) / 180);
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.fillRect(
          canvasEle.x0 - 50,
          canvasEle.y0 - 50,
          canvasEle.rectangleWidth * scale,
          canvasEle.rectangleHeight * scale
        );
        ctx.fill();
      }
      //圆形
      if (drawType === "圆形") {
        ctx.rotate((rot * Math.PI) / 180);
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.beginPath();
        ctx.arc(
          canvasEle.x0,
          canvasEle.y0,
          canvasEle.r * scale,
          0,
          2 * Math.PI,
          true
        );
        ctx.fill();
      }
      if (drawType === "三角形") {
        ctx.rotate((rot * Math.PI) / 180);
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.beginPath();
        ctx.moveTo(150 * scale, 20 * scale);
        ctx.lineTo(150 * scale, 120 * scale);
        ctx.lineTo(250 * scale, 20 * scale);
        ctx.fill();
      }
      if (drawType === "直线") {
        ctx.rotate((rot * Math.PI) / 180);
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.beginPath();
        ctx.moveTo(150 * scale, 20 * scale);
        ctx.lineTo(150 * scale, 120 * scale);
        ctx.lineTo(200 * scale, 120 * scale);
        ctx.lineTo(200 * scale, 200 * scale);
        ctx.stroke();
      }
      if (drawType === "图片") {
        ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
        ctx.save();
        ctx2.save();
        ctx.translate(removeX + imgW / 2, removeY + imgH / 2);
        ctx2.translate(removeX + imgW / 2, removeY + imgH / 2);
        ctx.rotate((rot * Math.PI) / 180);
        ctx2.rotate((rot * Math.PI) / 180);
        ctx.translate(-removeX - imgW / 2, -removeY - imgH / 2);
        ctx2.translate(-removeX - imgW / 2, -removeY - imgH / 2);
        ctx.drawImage(img, removeX, removeY, imgW, imgH);
        ctx2.moveTo(removeX + imgW / 2, removeY);
        ctx2.lineTo(removeX + imgW / 2, removeY - 36);
        ctx2.rect(removeX, removeY, imgW, imgH);
        ctx2.lineWidth = 3;
        ctx2.stroke();
        ctx2.beginPath();
        const r1 = contorlRect(removeX + imgW / 2 - 6, removeY - 36);
        const r2 = contorlRect(removeX - 12, removeY - 12);
        const r3 = contorlRect(removeX + imgW / 2 - 6, removeY - 12);
        const r4 = contorlRect(removeX + imgW, removeY - 12);
        const r5 = contorlRect(removeX - 12, removeY + imgH / 2 - 6);
        const r6 = contorlRect(removeX + imgW, removeY + imgH / 2 - 6);
        const r7 = contorlRect(removeX - 12, removeY + imgH);
        const r8 = contorlRect(removeX + imgW / 2 - 6, removeY + imgH);
        const r9 = contorlRect(removeX + imgW, removeY + imgH);
        ctx2.fill(r1);
        ctx2.fill(r2);
        ctx2.fill(r3);
        ctx2.fill(r4);
        ctx2.fill(r5);
        ctx2.fill(r6);
        ctx2.fill(r7);
        ctx2.fill(r8);
        ctx2.fill(r9);
        ctx2.closePath();
        ctx.restore();
        ctx2.restore();
      }
    };

    const changeImageSize = (
      rool,
      removeX,
      removeY,
      centerX,
      centerY,
      imgW,
      imgH
    ) => {
      const rot = rool * 3.6;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
      ctx.save();
      ctx2.save();
      ctx.translate(removeX + imgW / 2, removeY + imgH / 2);
      ctx2.translate(removeX + imgW / 2, removeY + imgH / 2);
      ctx.rotate((rot * Math.PI) / 180);
      ctx2.rotate((rot * Math.PI) / 180);
      ctx.translate(-removeX - imgW / 2, -removeY - imgH / 2);
      ctx2.translate(-removeX - imgW / 2, -removeY - imgH / 2);
      ctx.drawImage(
        img,
        centerX - 0.5 * imgW,
        centerY - 0.5 * imgH,
        imgW,
        imgH
      );
      ctx2.moveTo(centerX, centerY - imgH / 2);
      ctx2.lineTo(centerX, centerY - imgH / 2 - 36);
      ctx2.rect(centerX - imgW / 2, centerY - imgH / 2, imgW, imgH);
      ctx2.lineWidth = 3;
      ctx2.stroke();
      ctx2.beginPath();
      const r1 = contorlRect(centerX - 6, centerY - imgH / 2 - 36);
      const r2 = contorlRect(centerX - imgW / 2 - 12, centerY - imgH / 2 - 12);
      const r3 = contorlRect(centerX - 6, centerY - imgH / 2 - 12);
      const r4 = contorlRect(centerX + imgW / 2, centerY - imgH / 2 - 12);
      const r5 = contorlRect(centerX - imgW / 2 - 12, centerY - 6);
      const r6 = contorlRect(centerX + imgW / 2, centerY - 6);
      const r7 = contorlRect(centerX - imgW / 2 - 12, centerY + imgH / 2);
      const r8 = contorlRect(centerX - 6, centerY + imgH / 2);
      const r9 = contorlRect(centerX + imgW / 2, centerY + imgH / 2);
      ctx2.fill(r1);
      ctx2.fill(r2);
      ctx2.fill(r3);
      ctx2.fill(r4);
      ctx2.fill(r5);
      ctx2.fill(r6);
      ctx2.fill(r7);
      ctx2.fill(r8);
      ctx2.fill(r9);
      ctx2.closePath();
      ctx.restore();
      ctx2.restore();
    };

    const clear = () => {
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
    };
    const clear2 = () => {
      ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
    };
    //添加蒙版
    const compositeOperation = (type, drawType) => {
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
      ctx.globalCompositeOperation = type;
      if (drawType === "矩形") {
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.beginPath();
        ctx.fillRect(
          canvasEle.x0 - 50,
          canvasEle.y0 - 50,
          canvasEle.rectangleWidth,
          canvasEle.rectangleHeight
        );
        ctx.fill();
        ctx.font = `30px serif`;
        ctx.fillText("蒙版引入", canvasEle.x0, canvasEle.y0);
      }
      if (drawType === "圆形") {
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.beginPath();
        ctx.arc(canvasEle.x0, canvasEle.y0, canvasEle.r, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.font = `30px serif`;
        ctx.fillText("蒙版引入", canvasEle.x0, canvasEle.y0);
      }
      if (drawType === "三角形") {
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.beginPath();
        ctx.moveTo(150, 20);
        ctx.lineTo(150, 120);
        ctx.lineTo(250, 20);
        ctx.fill();
        ctx.font = `30px serif`;
        ctx.fillText("蒙版引入", canvasEle.x0, canvasEle.y0);
      }
    };
    //渐变函数
    const Gradient = (drawType, value2, colorText) => {
      const arr = [];
      arr.push(colorText.split("-"));
      const scale = value2 / 50;
      //矩形
      if (drawType === "矩形" && arr[0].length === 3) {
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
        const gradient = ctx.createLinearGradient(
          canvasEle.x0 - 50,
          0,
          canvasEle.x0 - 50 + canvasEle.rectangleWidth * scale,
          0
        );
        gradient.addColorStop(0, arr[0][0]);
        gradient.addColorStop(0.5, arr[0][1]);
        gradient.addColorStop(1, arr[0][2]);
        ctx.fillStyle = gradient;
        ctx.fillRect(
          canvasEle.x0 - 50,
          canvasEle.y0 - 50,
          canvasEle.rectangleWidth * scale,
          canvasEle.rectangleHeight * scale
        );
      }
      if (drawType === "圆形" && arr[0].length === 2) {
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        ctx2.clearRect(0, 0, canvas2Dom.width, canvas2Dom.height);
        const gradient = ctx.createRadialGradient(
          canvasEle.x0,
          canvasEle.y0,
          canvasEle.r * scale,
          canvasEle.x0,
          canvasEle.y0,
          0
        );
        gradient.addColorStop(0, arr[0][0]);
        gradient.addColorStop(1, arr[0][1]);
        ctx.fillStyle = gradient;
        ctx.fillRect(
          canvasEle.x0 - 50,
          canvasEle.y0 - 50,
          canvasEle.rectangleWidth * scale,
          canvasEle.rectangleHeight * scale
        );
      }
    };
    return {
      drawCircle: drawYuan,
      drawRectangle,
      drawTriangle,
      changeColor,
      changeSize,
      changeOpacity,
      rotateImage,
      changeImageSize,
      shadow,
      clear,
      clear2,
      drawLine,
      drawText,
      changeTextSize,
      liImage,
      drawCurveTo,
      pick,
      compositeOperation,
      Gradient,
      isPointInImage,
      drawBorder,
    };
  }
};

export { initCanvas, btnDrawFun, drawType };

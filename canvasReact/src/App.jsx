// import { func } from "prop-types";
import React, { useState, useRef, useEffect } from "react";
import "./App.less";
/**
 * 绘制方法
 */
let drawType = "";
const img = new Image();
const initCanvas = (canvasDom, value) => {
  if (canvasDom) {
    const canvasEle = {
      x0: 250,
      y0: 120,
      r: 50,
      rectangleWidth: 100,
      rectangleHeight: 100,
      fillStyle: value,
    };

    let canvas = canvasDom;
    let ctx = canvas.getContext("2d");
    //创建圆
    const drawCircle = (newDrawType) => {
      drawType = newDrawType;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx.fillStyle = canvasEle.fillStyle;
      ctx.beginPath();
      ctx.arc(canvasEle.x0, canvasEle.y0, canvasEle.r, 0, 2 * Math.PI, true);
      ctx.fill();
    };
    //画矩形
    const drawRectangle = (newDrawType) => {
      drawType = newDrawType;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx.fillStyle = canvasEle.fillStyle;
      ctx.beginPath();
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
      console.log(newDrawType, writeText);
      drawType = newDrawType;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
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
      ctx.font = `${fontSize}px ${wordType}`;
      ctx.textAlign = textValue;
      ctx.direction = textQi;
      ctx.fillText(writeText, canvasEle.x0, canvasEle.y0);
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
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, removeX, removeY);
        ctx.restore();
      };
      // https://cdn1.mihuiai.com/media/images/5ee5fd5a-f112-4b6b-b742-d58efeaa0775_thumb.png
    };

    //判断是否点击到图像内部
    const isPointInImage = (point, Image) => {
      const [touchX, touchY] = point;
      const [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = Image;
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
      const x = event.clientX - 200;
      const y = event.clientY - 150;
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
      ctx.beginPath();
      console.log(drawType, lineWidthValue);
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
      console.log(value2);
      const scale = value2 / 50;
      ctx.clearRect(0, 0, canvasDom.width * scale, canvasDom.height * scale);
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
        ctx.fillStyle = canvasEle.fillStyle;
        ctx.beginPath();
        ctx.moveTo(150 * scale, 20 * scale);
        ctx.lineTo(150 * scale, 120 * scale);
        ctx.lineTo(250 * scale, 20 * scale);
        ctx.fill();
      }
      if (drawType === "直线") {
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
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
    //旋转
    const rotateImage = (rool, value2) => {
      const scale = value2 / 50;
      const rot = rool;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      if (drawType === "矩形") {
        // ctx.translate(canvasEle.x0 - 50, canvasEle.y0 - 50);
        ctx.rotate((rot * Math.PI) / 180);
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
    };
    //移动

    const clear = () => {
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
    };
    //添加蒙版
    const compositeOperation = (type, drawType) => {
      console.log(drawType, 111);
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
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
      drawCircle,
      drawRectangle,
      drawTriangle,
      changeColor,
      changeSize,
      changeOpacity,
      rotateImage,
      shadow,
      clear,
      drawLine,
      drawText,
      changeTextSize,
      liImage,
      drawCurveTo,
      pick,
      compositeOperation,
      Gradient,
      isPointInImage,
    };
  }
};

//  点击事件更改绘制
const btnDrawFun = (drawType, canvasDom) => {
  if (drawType === "矩形") {
    initCanvas(canvasDom).drawRectangle(drawType);
  } else if (drawType === "圆形") {
    initCanvas(canvasDom).drawCircle(drawType);
  } else if (drawType === "三角形") {
    initCanvas(canvasDom).drawTriangle(drawType);
  } else if (drawType === "直线") {
    initCanvas(canvasDom).drawLine(drawType);
  }
};

//导航栏
function NavigationBar(props) {
  const { canvasDom, getWriteText, writeText, getX, getY } = props;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [cWidth, setCWidth] = useState(100);
  const [cHeight, setCHeight] = useState(50);
  const [imgUrl, setImgUrl] = useState(null);
  useEffect(() => {
    getX(x);
    getY(y);
  }, [props]);
  return (
    <div className="navigationBar">
      <ul className="bar">
        <li onClick={() => btnDrawFun("矩形", canvasDom)}>矩形</li>
        <li onClick={() => btnDrawFun("圆形", canvasDom)}>圆形</li>
        <li onClick={() => btnDrawFun("三角形", canvasDom)}>三角形</li>
        <li onClick={() => btnDrawFun("直线", canvasDom)}>直线</li>
        <li>
          文本
          <input
            type="text"
            placeholder="输入需要添加的文本"
            onChange={(e) => {
              getWriteText(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={() => initCanvas(canvasDom).drawText("文本", writeText)}
          >
            提交
          </button>
        </li>
        <li>
          贝塞尔曲线
          <div>
            <button
              type="submit"
              onClick={() => initCanvas(canvasDom).drawCurveTo("二次")}
            >
              二次
            </button>
            <button
              type="submit"
              onClick={() => initCanvas(canvasDom).drawCurveTo("三次")}
            >
              三次
            </button>
          </div>
        </li>
        <li>
          图片
          <input
            type="text"
            placeholder="输入图片地址"
            onChange={(e) => {
              initCanvas(canvasDom).liImage(
                "图片",
                e.target.value,
                100,
                50,
                0,
                0
              );
              setImgUrl(e.target.value);
              console.log(img.width, img.height);
            }}
          />
          <div>
            切片X
            <span>
              <input
                type="range"
                onChange={(e) => {
                  if (imgUrl) {
                    initCanvas(canvasDom).liImage(
                      "图片",
                      imgUrl,
                      e.target.value,
                      cHeight,
                      x,
                      y
                    );
                    setCWidth(e.target.value);
                  }
                }}
              />
            </span>
          </div>
          <div>
            切片Y
            <span>
              <input
                type="range"
                onChange={(e) => {
                  if (imgUrl) setCHeight(e.target.value);
                  initCanvas(canvasDom).liImage(
                    "图片",
                    imgUrl,
                    cWidth,
                    e.target.value,
                    x,
                    y
                  );
                }}
              />
            </span>
          </div>
          <div>
            原点坐标X
            <span>
              <input
                type="range"
                onChange={(e) => {
                  if (imgUrl) {
                    setX(e.target.value);
                    initCanvas(canvasDom).liImage(
                      "图片",
                      imgUrl,
                      cWidth,
                      cHeight,
                      e.target.value,
                      y
                    );
                  }
                }}
              />
            </span>
          </div>
          <div>
            原点坐标Y
            <span>
              <input
                type="range"
                onChange={(e) => {
                  if (imgUrl) {
                    setY(e.target.value);
                    initCanvas(canvasDom).liImage(
                      "图片",
                      imgUrl,
                      cWidth,
                      cHeight,
                      x,
                      e.target.value
                    );
                  }
                }}
              />
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}

//控制页面
function Control(props) {
  const [value, setValue] = useState("black");
  const [value2, setValue2] = useState(50);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(50);
  const [value5, setValue5] = useState(0);
  const [valueX, setValueX] = useState(0);
  const [valueY, setValueY] = useState(0);
  const [textValue, setTextValue] = useState("微软雅黑");
  const [valueColor, setValueColor] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [lineWidthValue, setLineWidthValue] = useState(0);
  const [textQi, setTextQi] = useState("start");
  const [lineStyle, setLineStyle] = useState("bevel");
  const [lineDashA, setLineDashA] = useState(0);
  const [lineDashB, setLineDashB] = useState(0);
  const [lineDashOffset, setLineDashOffset] = useState(0);
  const selectRef = React.useRef(null);
  const selectMenRef = React.useRef(null);
  const { canvasDom, writeText } = props;

  return (
    <div id="control">
      <div>操作界面</div>
      <div>
        <button onClick={() => initCanvas(canvasDom).clear()}>清空画布</button>{" "}
        {/* 蒙版 */}
        <span>
          蒙版
          <select
            ref={selectMenRef}
            onChange={(e) =>
              initCanvas(canvasDom).compositeOperation(e.target.value, drawType)
            }
          >
            <option value="source-over">source-over</option>
            <option value="source-in">source-in</option>
            <option value="source-out">source-out</option>
            <option value="source-atop">source-atop</option>
            <option value="destination-over">destination-over</option>
            <option value="destination-in">destination-in</option>
            <option value="destination-out">destination-out</option>
            <option value="destination-atop">destination-atop</option>
            <option value="lighter">lighter</option>
            <option value="copy">copy</option>
            <option value="xor">xor</option>
            <option value="multiply">multiply</option>
            <option value="screen">screen</option>
            <option value="overlay">overlay</option>
            <option value="darken">darken</option>
            <option value="lighten">lighten</option>
            <option value="color-dodge">color-dodge</option>
            <option value="color-burn">color-burn</option>
            <option value="hard-light">hard-light</option>
            <option value="soft-light">soft-light</option>
            <option value="difference">difference</option>
            <option value="exclusion">exclusion</option>
            <option value="hue">hue</option>
            <option value="saturation">saturation</option>
            <option value="color">color</option>
            <option value="luminosity">luminosity</option>
          </select>
        </span>
      </div>
      {/* 颜色 */}
      <span>
        颜色
        <input
          type="text"
          id="change"
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          id="changeColor"
          onClick={() => initCanvas(canvasDom).changeColor(value, value2)}
        >
          提交
        </button>
      </span>
      {/* 大小 */}
      <span>
        大小
        <input
          type="range"
          onChange={(e) => {
            setValue2(e.target.value);
            initCanvas(canvasDom).changeSize(e.target.value);
          }}
        />
      </span>
      {/* 透明度 */}
      <span>
        透明度
        <input
          type="range"
          onChange={(e) => {
            setValue3(e.target.value);
            initCanvas(canvasDom).changeOpacity(e.target.value, value2);
          }}
        />
      </span>
      {/* 旋转 */}
      <span>
        旋转
        <input
          type="range"
          onChange={(e) => {
            setValue4(e.target.value);
            initCanvas(canvasDom).rotateImage(value4 - e.target.value, value2);
          }}
        />
      </span>
      {/* 渐变 */}
      <span>
        渐变{" "}
        <input
          type="text"
          placeholder="颜色-颜色(圆)-颜色(矩）"
          onChange={(e) => {
            initCanvas(canvasDom).Gradient(drawType, value2, e.target.value);
          }}
        />{" "}
      </span>
      {/* 阴影 */}
      <div>
        阴影 偏移X{" "}
        <input type="text" onChange={(e) => setValueX(e.target.value)} />
        <button
          type="submit"
          onClick={() =>
            initCanvas(canvasDom).shadow(
              value5,
              value2,
              valueX,
              valueY,
              valueColor
            )
          }
        >
          提交
        </button>
        偏移Y <input type="text" onChange={(e) => setValueY(e.target.value)} />
        <button
          type="submit"
          onClick={() =>
            initCanvas(canvasDom).shadow(
              value5,
              value2,
              valueX,
              valueY,
              valueColor
            )
          }
        >
          提交
        </button>
        阴影颜色{" "}
        <input type="text" onChange={(e) => setValueColor(e.target.value)} />
        <button
          type="submit"
          onClick={() =>
            initCanvas(canvasDom).shadow(
              value5,
              value2,
              valueX,
              valueY,
              valueColor
            )
          }
        >
          提交
        </button>
        模糊度
        <input
          type="range"
          onChange={(e) => {
            setValue5(e.target.value);
            initCanvas(canvasDom).shadow(value5, value2, valueX, valueY);
          }}
        />
      </div>
      {/* 字体 */}
      <div>
        字号
        <input type="text" onChange={(e) => setFontSize(e.target.value)} />
        <button
          type="submit"
          onClick={() =>
            initCanvas(canvasDom).changeTextSize("文本", writeText, fontSize)
          }
        >
          提交
        </button>
        字体
        <select
          onChange={(e) => {
            (e) => setTextValue(e.target.value);
            initCanvas(canvasDom).changeTextSize(
              "文本",
              writeText,
              fontSize,
              e.target.value
            );
          }}
        >
          <option value="微软雅黑">微软雅黑</option>
          <option value="楷体">楷体</option>
        </select>
        对齐方式
        <select
          onChange={(e) => {
            setTextQi(e.target.value);
            initCanvas(canvasDom).changeTextSize(
              "文本",
              writeText,
              fontSize,
              textValue,
              e.target.value
            );
          }}
        >
          <option value="start">start</option>
          <option value="end">end</option>
          <option value="left">left</option>
          <option value="right ">right </option>
          <option value="center">center</option>
        </select>
        文本方向
        <select
          onChange={(e) =>
            initCanvas(canvasDom).changeTextSize(
              "文本",
              writeText,
              fontSize,
              textValue,
              textQi,
              e.target.value
            )
          }
        >
          <option value="ltr">从左向右</option>
          <option value="rtl">从右向左</option>
        </select>
      </div>
      {/* 线条 */}
      <div>
        直线方法
        <span>
          线宽
          <input
            type="range"
            onChange={(e) => {
              setLineWidthValue(e.target.value);
              if (drawType === "直线") {
                initCanvas(canvasDom).drawLine(drawType, lineWidthValue);
              } else if (drawType === "二次") {
                initCanvas(canvasDom).drawCurveTo("二次", lineWidthValue);
              } else if (drawType === "三次") {
                initCanvas(canvasDom).drawCurveTo("三次", lineWidthValue);
              }
            }}
          />
        </span>
        <span>
          末端样式{" "}
          <select
            name="modle"
            ref={selectRef}
            onChange={(e) => {
              const checked = e.target.value;
              if (drawType === "直线") {
                initCanvas(canvasDom).drawLine("直线", lineWidthValue, checked);
              }
            }}
          >
            <option value="butt">方形</option>
            <option value="round">圆形</option>
            <option value="square">区域</option>
          </select>
        </span>
        <span>
          接合处样式
          <select
            ref={selectRef}
            onChange={(e) => {
              setLineStyle(e.target.value);
              if (drawType === "直线") {
                initCanvas(canvasDom).drawLine(
                  "直线",
                  lineWidthValue,
                  null,
                  e.target.value
                );
              }
            }}
          >
            <option value="bevel">bevel</option>
            <option value="round">round</option>
            <option value="miter">miter</option>
          </select>
        </span>
        <span>
          绘制虚线
          <input
            type="text"
            placeholder="实线长"
            onChange={(e) => {
              setLineDashA(e.target.value);
              if (drawType === "直线") {
                initCanvas(canvasDom).drawLine(
                  "直线",
                  lineWidthValue,
                  null,
                  lineStyle,
                  e.target.value,
                  lineDashB,
                  lineDashOffset
                );
              }
            }}
          />
          <input
            type="text"
            placeholder="虚线长"
            onChange={(e) => {
              if (drawType === "直线") {
                setLineDashB(e.target.value);
                initCanvas(canvasDom).drawLine(
                  "直线",
                  lineWidthValue,
                  null,
                  lineStyle,
                  lineDashA,
                  e.target.value,
                  lineDashOffset
                );
              }
            }}
          />
          <input
            type="text"
            placeholder="起始位置"
            onChange={(e) => {
              if (drawType === "直线") {
                setLineDashOffset(e.target.value);
                initCanvas(canvasDom).drawLine(
                  "直线",
                  lineWidthValue,
                  null,
                  lineStyle,
                  lineDashA,
                  lineDashB,
                  e.target.value
                );
              }
            }}
          />
        </span>
      </div>
    </div>
  );
}

//画布页面
function Canvas(props) {
  const { divHoveredDom, divSelectedDom } = props;
  const { canvasWidth = 1000, canvasHeight = 500, getCanvasDom } = props;
  const canvasRef = React.useRef(null);
  const showFlag = React.useRef(false);
  const changeX = React.useRef(0);
  const changeY = React.useRef(0);
  const changeOldX = React.useRef(0);
  const changeOldY = React.useRef(0);

  useEffect(() => {
    getCanvasDom(canvasRef.current);
  }, [canvasHeight, canvasWidth, props]);
  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      onClick={(e) => {
        initCanvas(canvasRef.current).pick(e, divHoveredDom);
      }}
      onMouseMove={(e) => initCanvas(canvasRef.current).pick(e, divSelectedDom)}
      onMouseDown={(e) => {
        const { left, top } = canvasRef.current.getBoundingClientRect();
        let eX = e.clientX - left;
        let eY = e.clientY - top;
        const  ctx = canvasRef.current.getContext('2d')
        if (!showFlag.current) {
          initCanvas(canvasRef.current).liImage(
            "图片",
            "https://cdn1.mihuiai.com/media/images/5ee5fd5a-f112-4b6b-b742-d58efeaa0775_thumb.png",
            1000,
            500,
            0,
            0,
            eX,
            eY
          );
          showFlag.current = true;
          changeOldX.current = eX;
          changeOldY.current = eY;
          changeX.current = eX;
          changeY.current = eY;
          return;
        }


        if (
          initCanvas(canvasRef.current).isPointInImage(
            [eX, eY],
            [
              [changeOldX.current, changeOldY.current],
              [changeOldX.current + img.width, changeOldY.current],
              [changeOldX.current, changeOldY.current + img.height],
              [changeOldX.current + img.width, changeOldY.current + img.height],
            ]
          )
        ) {
          let flag = true
          canvasRef.current.onmousemove = (e) => {
            let eX = e.clientX - left;
            let eY = e.clientY - top;
            if(!flag){
              return;
            }
            flag  = false
            setTimeout(()=>{
              initCanvas(canvasRef.current).liImage(
                "图片",
                "https://cdn1.mihuiai.com/media/images/5ee5fd5a-f112-4b6b-b742-d58efeaa0775_thumb.png",
                1000,
                500,
                0,
                0,
                changeX.current,
                changeY.current
              );
              changeX.current = eX - changeOldX.current;
              changeY.current = eY - changeOldY.current;
              canvasRef.current.onmouseup = () => {
                canvasRef.current.onmousemove = null;
              };
              flag = true
            },10)

          };
        }
      }}
    ></canvas>
  );
}

function ColorChoose(props) {
  const { getDivHoveredDom, getDivSelectedDom } = props;
  const divHoveredRef = React.useRef(null);
  const divSelectedRef = React.useRef(null);
  useEffect(() => {
    getDivHoveredDom(divHoveredRef.current);
  }, [props]);
  useEffect(() => {
    getDivSelectedDom(divSelectedRef.current);
  }, [props]);
  return (
    <div className="color-choose">
      颜色选择器
      <div>
        <div id="hovered-color" ref={divHoveredRef}>
          点击获取
        </div>
        <div id="selected-color" ref={divSelectedRef}>
          实时获取
        </div>
      </div>
    </div>
  );
}

function App() {
  const [canvasDom, setCanvasDom] = useState(null);
  const [drawType, setDrawType] = useState(null);
  const [writeText, setwriteText] = useState(null);
  const [divHoveredDom, setDivHoveredDom] = useState(null);
  const [divSelectedDom, setDivSelectedDom] = useState(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  return (
    <div>
      <NavigationBar
        canvasDom={canvasDom}
        getdrawType={(type) => setDrawType(type)}
        getWriteText={(type) => setwriteText(type)}
        writeText={writeText}
        getX={(xValue) => setX(xValue)}
        getY={(yValue) => setY(yValue)}
      ></NavigationBar>
      <Control
        canvasDom={canvasDom}
        drawType={drawType}
        writeText={writeText}
      ></Control>
      <Canvas
        getCanvasDom={(dom) => setCanvasDom(dom)}
        divHoveredDom={divHoveredDom}
        divSelectedDom={divSelectedDom}
        x={x}
        y={y}
      ></Canvas>
      <ColorChoose
        getDivHoveredDom={(dom) => setDivHoveredDom(dom)}
        getDivSelectedDom={(dom) => setDivSelectedDom(dom)}
      ></ColorChoose>
    </div>
  );
}

export default App;

// import { func } from "prop-types";
import React, { useState, useRef, useEffect } from "react";
import "./App.less";
/**
 * 绘制方法
 */
let drawType = "";
const initCanvas = (canvasDom, value) => {
  if (canvasDom) {
    const canvasEle = {
      x0: 200,
      y0: 70,
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
    const drawLine = (newDrawType, lineWidthValue, checkedValue, joinValue) => {
      drawType = newDrawType;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx.lineCap = checkedValue;
      ctx.lineWidth = lineWidthValue;
      ctx.lineJoin = joinValue;
      // ctx.setLineDash([lineDashA, lineDashB]);
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
      ctx.font = `30px serif`;
      ctx.fillText(writeText, canvasEle.x0, canvasEle.y0);
    };

    //修改文本字体大小
    const changeTextSize = (newDrawType, writeText, fontSize) => {
      console.log(newDrawType, writeText, fontSize);
      drawType = newDrawType;
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx.font = `${fontSize}px serif`;
      ctx.fillText(writeText, canvasEle.x0, canvasEle.y0);
    };

    //引入图片
    const liImage = (newDrawType, imgUrl, cWidth, cHeight, x, y) => {
      drawType = newDrawType;
      const img = new Image();
      img.src = imgUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        ctx.save();
        ctx.beginPath();
        ctx.rect(x*10, y*10, cWidth * 10, cHeight * 10);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, canvasEle.x0, canvasEle.y0);
        ctx.restore();
      };
      // https://cdn1.mihuiai.com/media/images/5ee5fd5a-f112-4b6b-b742-d58efeaa0775_thumb.png
    };

    //二次贝塞尔曲线
    const drawCurveTo = (newDrawType) => {
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      ctx.beginPath();
      ctx.moveTo(canvasDom.x0 - 50, canvasDom.y0 - 50);
      if (newDrawType === "二次") {
        ctx.quadraticCurveTo(221, 92, 300, 100);
      } else if (newDrawType === "三次") {
        ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
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
    const rotateImage = (value4, value2) => {
      const scale = value2 / 50;
      const rot = (value4 - 50) / 25;
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
    const clear = () => {
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
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
    };
  }
};

/**
 * 点击事件更改绘制
 */
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
  const { canvasDom, getWriteText, writeText } = props;
  const [imgUrl, setImgUrl] = useState(
    "https://cdn1.mihuiai.com/media/images/c209222b-472d-45a1-8596-f461ee99bc42_thumb.png"
  );
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [cWidth, setCWidth] = useState(500);
  const [cHeight, setCHeight] = useState(500);

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
              setImgUrl(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={() => initCanvas(canvasDom).liImage("图片", imgUrl)}
          >
            提交
          </button>
          <div>
            切片X{" "}
            <span>
              <input
                type="range"
                onChange={(e) => {
                  setCWidth(e.target.value);
                  initCanvas(canvasDom).liImage(
                    "图片",
                    imgUrl,
                    e.target.value,
                    cHeight
                  );
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
                  setCHeight(e.target.value);
                  initCanvas(canvasDom).liImage(
                    "图片",
                    imgUrl,
                    cWidth,
                    e.target.value
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
                  setX(e.target.value);
                  initCanvas(canvasDom).liImage(
                    "图片",
                    imgUrl,
                    cWidth,
                    cHeight,
                    e.target.value,
                    y
                  );
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
                  setY(e.target.value);
                  initCanvas(canvasDom).liImage(
                    "图片",
                    imgUrl,
                    cWidth,
                    cHeight,
                    x,
                    e.target.value
                  );
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
  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);
  const [valueX, setValueX] = useState(0);
  const [valueY, setValueY] = useState(0);
  const [valueColor, setValueColor] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [lineWidthValue, setLineWidthValue] = useState(0);
  const selectRef = React.useRef(null);
  const { canvasDom, writeText } = props;

  return (
    <div id="control">
      <div>操作界面</div>
      <div>
        <button onClick={() => initCanvas(canvasDom).clear()}>清空画布</button>
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
            initCanvas(canvasDom).rotateImage(e.target.value, value2);
          }}
        />
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
      {/* 字体大小 */}
      <div>
        字号
        <input type="text" onChange={(e) => setFontSize(e.target.value)} />{" "}
        <button
          type="submit"
          onClick={() =>
            initCanvas(canvasDom).changeTextSize("文本", writeText, fontSize)
          }
        >
          提交
        </button>
      </div>
      {/* 线条 */}
      <div>
        直线方法{" "}
        <span>
          线宽
          <input
            type="range"
            onChange={(e) => {
              setLineWidthValue(e.target.value);
              initCanvas(canvasDom).drawLine("直线", lineWidthValue);
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
              initCanvas(canvasDom).drawLine("直线", lineWidthValue, checked);
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
              initCanvas(canvasDom).drawLine(
                "直线",
                lineWidthValue,
                null,
                e.target.value
              );
            }}
          >
            <option value="bevel">bevel</option>
            <option value="round">round</option>
            <option value="miter">miter</option>
          </select>
        </span>
        <span>
          虚线{" "}
          <input
            type="text"
            placeholder="输入实线部分宽度"
            onChange={(e) => {
              initCanvas(canvasDom).drawLine(
                "直线",
                lineWidthValue,
                null,
                null,
                e.target.value
              );
            }}
          />{" "}
          <input
            type="text"
            placeholder="输入虚线部分宽度"
            onChange={(e) => {
              initCanvas(canvasDom).drawLine(
                "直线",
                lineWidthValue,
                null,
                null,
                e.target.value
              );
            }}
          />
        </span>
      </div>
    </div>
  );
}

//画布页面
function Canvas(props) {
  const { canvasWidth = 1000, canvasHeight = 500, getCanvasDom } = props;
  const canvasRef = React.useRef(null);
  useEffect(() => {
    getCanvasDom(canvasRef.current);
  }, [canvasHeight, canvasWidth, props]);
  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
    ></canvas>
  );
}

function App() {
  const [canvasDom, setCanvasDom] = useState(null);
  const [drawType, setDrawType] = useState(null);
  const [writeText, setwriteText] = useState(null);
  return (
    <div>
      <NavigationBar
        canvasDom={canvasDom}
        getdrawType={(type) => setDrawType(type)}
        getWriteText={(type) => setwriteText(type)}
        writeText={writeText}
      ></NavigationBar>
      <Control
        canvasDom={canvasDom}
        drawType={drawType}
        writeText={writeText}
      ></Control>
      <Canvas getCanvasDom={(dom) => setCanvasDom(dom)}></Canvas>
    </div>
  );
}

export default App;

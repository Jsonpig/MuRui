import React, { useState, useRef, useEffect } from "react";
import { initCanvas } from "../Tools/All";
//画布页面
function Canvas(props) {
  const { divHoveredDom, divSelectedDom } = props;
  const {
    canvasWidth = 650,
    canvasHeight = 730,
    canvas2Width = 650,
    canvas2Height = 730,
    getCanvasDom,
    getCanvas2Dom,
  } = props;
  const canvasRef = React.useRef(null);
  const canvas2Ref = React.useRef(null);
  const showFlag = React.useRef(false);
  const changeX = React.useRef(0);
  const changeY = React.useRef(0);
  const changeOldX = React.useRef(0);
  const changeOldY = React.useRef(0);
  const [rotateValue, setRotateValue] = useState(0);
  const angle = Number(rotateValue) * (Math.PI / 50);
  useEffect(() => {
    getCanvasDom(canvasRef.current);
  }, [canvasHeight, canvasWidth, props]);
  useEffect(() => {
    getCanvas2Dom(canvas2Ref.current);
  }, [canvas2Width, canvas2Height, props]);
  return (
    <div id="canvas-gray">
      <div>
        图片旋转
        <input
          type="range"
          defaultValue="0"
          onChange={(e) => {
            setRotateValue(e.target.value);
            initCanvas(canvasRef.current, canvas2Ref.current).rotateImage(
              e.target.value,
              50,
              changeX.current,
              changeY.current
            );
          }}
          min={0}
          max={100}
          step={1}
        />
      </div>
      <canvas
        id="canvas2"
        ref={canvas2Ref}
        width={canvas2Width}
        height={canvas2Height}
      ></canvas>
      <canvas
        id="canvas"
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onClick={(e) => {
          const { left, top } = canvasRef.current.getBoundingClientRect();
          let eX = e.clientX - left; //在画布上点击的坐标
          let eY = e.clientY - top;
          initCanvas(canvasRef.current).pick(e, divHoveredDom);
          if (
            initCanvas(canvasRef.current).isPointInImage(
              [eX, eY],
              [
                [
                  // 计算旋转之后锁定区域的坐标
                  -106 * Math.cos(angle) -
                    -106 * Math.sin(angle) +
                    changeOldX.current +
                    100,
                  -106 * Math.sin(angle) +
                    -106 * Math.cos(angle) +
                    changeOldY.current +
                    100,
                ],
                [
                  106 * Math.cos(angle) -
                    -106 * Math.sin(angle) +
                    changeOldX.current +
                    100,
                  106 * Math.sin(angle) +
                    -106 * Math.cos(angle) +
                    changeOldY.current +
                    100,
                ],
                [
                  106 * Math.cos(angle) -
                    106 * Math.sin(angle) +
                    changeOldX.current +
                    100,
                  106 * Math.sin(angle) +
                    106 * Math.cos(angle) +
                    changeOldY.current +
                    100,
                ],
                [
                  -106 * Math.cos(angle) -
                    106 * Math.sin(angle) +
                    changeOldX.current +
                    100,
                  -106 * Math.sin(angle) +
                    106 * Math.cos(angle) +
                    changeOldY.current +
                    100,
                ],
              ]
            )
          ) {
            initCanvas(canvasRef.current, canvas2Ref.current).rotateImage(
              rotateValue,
              50,
              changeX.current,
              changeY.current
            );
          }
        }}
        onMouseMove={(e) => {
          const { left, top } = canvasRef.current.getBoundingClientRect();
          let eX = e.clientX - left; //在画布上点击的坐标
          let eY = e.clientY - top;
          let OldX = changeOldX.current;
          let OldY = changeOldY.current;
          const JudgePoint = (point) => {
            const touch = [eX, eY];
            const pointArr = []; //接收传入进来的数组
            point.forEach((item) => {
              pointArr.push([
                (item[0] - OldX - 100) * Math.cos(angle) -
                  (item[1] - OldY - 100) * Math.sin(angle) +
                  changeX.current +
                  100,
                (item[0] - OldX - 100) * Math.sin(angle) +
                  (item[1] - OldY - 100) * Math.cos(angle) +
                  changeY.current +
                  100,
              ]);
            });
            // console.log(pointArr);

            return initCanvas(
              canvasRef.current,
              canvas2Ref.current
            ).isPointInImage(touch, pointArr);
          };
          initCanvas(canvasRef.current).pick(e, divSelectedDom);
          if (
            JudgePoint([
              [OldX + 194, OldY - 6],
              [OldX + 206, OldY - 6],
              [OldX + 206, OldY + 6],
              [OldX + 194, OldY + 6],
            ])
          ) {
            if (angle <= Math.PI / 6) {
              canvasRef.current.style = "cursor:ne-resize";
            } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
              canvasRef.current.style = "cursor:e-resize";
            } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
              canvasRef.current.style = "cursor:se-resize";
            } else if (
              angle > (2 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:s-resize";
            } else if (
              angle > (5 * Math.PI) / 6 &&
              angle <= (7 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:sw-resize";
            } else if (
              angle > (7 * Math.PI) / 6 &&
              angle <= (4 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:w-resize";
            } else if (
              angle > (4 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:nw-resize";
            } else if (
              angle > (5 * Math.PI) / 3 &&
              angle <= (11 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:n-resize";
            } else {
              canvasRef.current.style = "cursor:ne-resize";
            }
          } else if (
            JudgePoint([
              [OldX - 6, OldY - 6],
              [OldX + 6, OldY - 6],
              [OldX + 6, OldY + 6],
              [OldX - 6, OldY + 6],
            ])
          ) {
            if (angle <= Math.PI / 6) {
              canvasRef.current.style = "cursor:nw-resize";
            } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
              canvasRef.current.style = "cursor:n-resize";
            } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
              canvasRef.current.style = "cursor:ne-resize";
            } else if (
              angle > (2 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:e-resize";
            } else if (
              angle > (5 * Math.PI) / 6 &&
              angle <= (7 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:se-resize";
            } else if (
              angle > (7 * Math.PI) / 6 &&
              angle <= (4 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:s-resize";
            } else if (
              angle > (4 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:sw-resize";
            } else if (
              angle > (5 * Math.PI) / 3 &&
              angle <= (11 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:w-resize";
            } else {
              canvasRef.current.style = "cursor:nw-resize";
            }
          } else if (
            JudgePoint([
              [OldX + 94, OldY - 6],
              [OldX + 106, OldY - 6],
              [OldX + 106, OldY + 6],
              [OldX + 94, OldY + 6],
            ])
          ) {
            if (angle <= Math.PI / 6) {
              canvasRef.current.style = "cursor:n-resize";
            } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
              canvasRef.current.style = "cursor:ne-resize";
            } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
              canvasRef.current.style = "cursor:e-resize";
            } else if (
              angle > (2 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:se-resize";
            } else if (
              angle > (5 * Math.PI) / 6 &&
              angle <= (7 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:s-resize";
            } else if (
              angle > (7 * Math.PI) / 6 &&
              angle <= (4 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:sw-resize";
            } else if (
              angle > (4 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:w-resize";
            } else if (
              angle > (5 * Math.PI) / 3 &&
              angle <= (11 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:nw-resize";
            } else {
              canvasRef.current.style = "cursor:n-resize";
            }
          } else if (
            JudgePoint([
              [OldX - 6, OldY + 94],
              [OldX + 6, OldY + 94],
              [OldX + 6, OldY + 106],
              [OldX - 6, OldY + 106],
            ])
          ) {
            if (angle <= Math.PI / 6) {
              canvasRef.current.style = "cursor:w-resize";
            } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
              canvasRef.current.style = "cursor:nw-resize";
            } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
              canvasRef.current.style = "cursor:n-resize";
            } else if (
              angle > (2 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:ne-resize";
            } else if (
              angle > (5 * Math.PI) / 6 &&
              angle <= (7 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:e-resize";
            } else if (
              angle > (7 * Math.PI) / 6 &&
              angle <= (4 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:se-resize";
            } else if (
              angle > (4 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:s-resize";
            } else if (
              angle > (5 * Math.PI) / 3 &&
              angle <= (11 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:sw-resize";
            } else {
              canvasRef.current.style = "cursor:w-resize";
            }
          } else if (
            JudgePoint([
              [OldX + 194, OldY + 94],
              [OldX + 206, OldY + 94],
              [OldX + 206, OldY + 106],
              [OldX + 194, OldY + 106],
            ])
          ) {
            if (angle <= Math.PI / 6) {
              canvasRef.current.style = "cursor:e-resize";
            } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
              canvasRef.current.style = "cursor:se-resize";
            } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
              canvasRef.current.style = "cursor:s-resize";
            } else if (
              angle > (2 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:sw-resize";
            } else if (
              angle > (5 * Math.PI) / 6 &&
              angle <= (7 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:w-resize";
            } else if (
              angle > (7 * Math.PI) / 6 &&
              angle <= (4 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:nw-resize";
            } else if (
              angle > (4 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:n-resize";
            } else if (
              angle > (5 * Math.PI) / 3 &&
              angle <= (11 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:ne-resize";
            } else {
              canvasRef.current.style = "cursor:e-resize";
            }
          } else if (
            JudgePoint([
              [OldX - 6, OldY + 194],
              [OldX + 6, OldY + 194],
              [OldX + 6, OldY + 206],
              [OldX - 6, OldY + 206],
            ])
          ) {
            if (angle <= Math.PI / 6) {
              canvasRef.current.style = "cursor:sw-resize";
            } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
              canvasRef.current.style = "cursor:w-resize";
            } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
              canvasRef.current.style = "cursor:nw-resize";
            } else if (
              angle > (2 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:n-resize";
            } else if (
              angle > (5 * Math.PI) / 6 &&
              angle <= (7 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:ne-resize";
            } else if (
              angle > (7 * Math.PI) / 6 &&
              angle <= (4 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:e-resize";
            } else if (
              angle > (4 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:se-resize";
            } else if (
              angle > (5 * Math.PI) / 3 &&
              angle <= (11 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:s-resize";
            } else {
              canvasRef.current.style = "cursor:sw-resize";
            }
          } else if (
            JudgePoint([
              [OldX + 94, OldY + 194],
              [OldX + 106, OldY + 194],
              [OldX + 106, OldY + 206],
              [OldX + 94, OldY + 206],
            ])
          ) {
            if (angle <= Math.PI / 6) {
              canvasRef.current.style = "cursor:s-resize";
            } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
              canvasRef.current.style = "cursor:sw-resize";
            } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
              canvasRef.current.style = "cursor:w-resize";
            } else if (
              angle > (2 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:nw-resize";
            } else if (
              angle > (5 * Math.PI) / 6 &&
              angle <= (7 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:n-resize";
            } else if (
              angle > (7 * Math.PI) / 6 &&
              angle <= (4 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:ne-resize";
            } else if (
              angle > (4 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:e-resize";
            } else if (
              angle > (5 * Math.PI) / 3 &&
              angle <= (11 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:se-resize";
            } else {
              canvasRef.current.style = "cursor:s-resize";
            }
          } else if (
            JudgePoint([
              [OldX + 194, OldY + 194],
              [OldX + 206, OldY + 194],
              [OldX + 206, OldY + 206],
              [OldX + 194, OldY + 206],
            ])
          ) {
            if (angle <= Math.PI / 6) {
              canvasRef.current.style = "cursor:se-resize";
            } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
              canvasRef.current.style = "cursor:s-resize";
            } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
              canvasRef.current.style = "cursor:sw-resize";
            } else if (
              angle > (2 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:w-resize";
            } else if (
              angle > (5 * Math.PI) / 6 &&
              angle <= (7 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:nw-resize";
            } else if (
              angle > (7 * Math.PI) / 6 &&
              angle <= (4 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:n-resize";
            } else if (
              angle > (4 * Math.PI) / 3 &&
              angle <= (5 * Math.PI) / 3
            ) {
              canvasRef.current.style = "cursor:ne-resize";
            } else if (
              angle > (5 * Math.PI) / 3 &&
              angle <= (11 * Math.PI) / 6
            ) {
              canvasRef.current.style = "cursor:e-resize";
            } else {
              canvasRef.current.style = "cursor:se-resize";
            }
          } else if (
            JudgePoint([
              [
                // 计算旋转之后锁定区域的坐标
                OldX - 6,
                OldY - 6,
              ],
              [OldX + 196, OldY - 6],
              [OldX + 196, OldY + 196],
              [OldX - 6, OldY + 196],
            ])
          ) {
            canvasRef.current.style = "cursor:move";
          } else {
            canvasRef.current.style = "cursor:default";
          }
        }}
        //鼠标点击下去
        onMouseDown={(e) => {
          const { left, top } = canvasRef.current.getBoundingClientRect();
          let eX = e.clientX - left; //在画布上点击的坐标
          let eY = e.clientY - top;
          initCanvas(canvasRef.current, canvas2Ref.current).clear2();
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
            initCanvas(canvasRef.current, canvas2Ref.current).drawBorder(
              eX,
              eY
            );
            showFlag.current = true;
            //获取鼠标点击下去后允许点击区域的坐标
            changeOldX.current = eX;
            changeOldY.current = eY;
            //获取鼠标点击下去后图片开始绘制的坐标
            changeX.current = eX;
            changeY.current = eY;
          }
          //计算鼠标点击区域点击的坐标后边方便定位
          const xD = eX - changeOldX.current;
          const yD = eY - changeOldY.current;
          //判断鼠标是否在点击区域内？
          if (
            initCanvas(canvasRef.current).isPointInImage(
              [eX, eY],
              [
                [
                  // 计算旋转之后锁定区域的坐标
                  -106 * Math.cos(angle) -
                    -106 * Math.sin(angle) +
                    changeOldX.current +
                    100,
                  -106 * Math.sin(angle) +
                    -106 * Math.cos(angle) +
                    changeOldY.current +
                    100,
                ],
                [
                  106 * Math.cos(angle) -
                    -106 * Math.sin(angle) +
                    changeOldX.current +
                    100,
                  106 * Math.sin(angle) +
                    -106 * Math.cos(angle) +
                    changeOldY.current +
                    100,
                ],
                [
                  106 * Math.cos(angle) -
                    106 * Math.sin(angle) +
                    changeOldX.current +
                    100,
                  106 * Math.sin(angle) +
                    106 * Math.cos(angle) +
                    changeOldY.current +
                    100,
                ],
                [
                  -106 * Math.cos(angle) -
                    106 * Math.sin(angle) +
                    changeOldX.current +
                    100,
                  -106 * Math.sin(angle) +
                    106 * Math.cos(angle) +
                    changeOldY.current +
                    100,
                ],
              ]
            )
          ) {
            initCanvas(canvasRef.current, canvas2Ref.current).rotateImage(
              rotateValue,
              50,
              changeX.current,
              changeY.current
            );
            //鼠标移动
            canvasRef.current.onmousemove = (e) => {
              let eX = e.clientX - left;
              let eY = e.clientY - top;
              //更新图片坐标的位置
              initCanvas(canvasRef.current, canvas2Ref.current).rotateImage(
                rotateValue,
                50,
                changeX.current,
                changeY.current
              );
              changeX.current = eX - xD;
              changeY.current = eY - yD;

              canvasRef.current.onmouseup = () => {
                //鼠标再次抬起更新可点击区域的坐标
                changeOldX.current = changeX.current;
                changeOldY.current = changeY.current;
                initCanvas(canvasRef.current, canvas2Ref.current).clear2();
                // canvasRef.current.style = "cursor:default";
                canvasRef.current.onmousemove = null;
              };
            };
          }
        }}
      ></canvas>
    </div>
  );
}

export default Canvas;

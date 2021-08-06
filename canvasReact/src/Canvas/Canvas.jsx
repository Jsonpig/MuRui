import React, { useState, useRef, useEffect } from "react";
import { initCanvas } from "../Tools/All";
import { tr, tl, tm, ml, mr, bl, br, bm } from "./pointControl";
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
  const imgWidth = React.useRef(200);
  const imgHeight = React.useRef(200);
  const [rotateValue, setRotateValue] = useState(0);
  const angle = Number(rotateValue) * (Math.PI / 50);
  const JudgePoint = (point, eX, eY, OldX, OldY) => {
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

    return initCanvas(canvasRef.current, canvas2Ref.current).isPointInImage(
      touch,
      pointArr
    );
  };
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
          let OldX = changeOldX.current;
          let OldY = changeOldY.current;
          initCanvas(canvasRef.current).pick(e, divHoveredDom);
          if (
            JudgePoint(
              [
                [OldX, OldY],
                [OldX + 200, OldY],
                [OldX + 206, OldY + 200],
                [OldX, OldY + 200],
              ],
              eX,
              eY,
              OldX,
              OldY
            )
          ) {
            initCanvas(canvasRef.current, canvas2Ref.current).rotateImage(
              rotateValue,
              50,
              changeX.current,
              changeY.current,
              0
            );
          }
        }}
        onMouseMove={(e) => {
          const { left, top } = canvasRef.current.getBoundingClientRect();
          let eX = e.clientX - left; //在画布上点击的坐标
          let eY = e.clientY - top;
          let OldX = changeOldX.current;
          let OldY = changeOldY.current;
          initCanvas(canvasRef.current).pick(e, divSelectedDom);
          if (
            JudgePoint(
              [
                [OldX + 200, OldY - 12],
                [OldX + 212, OldY - 12],
                [OldX + 212, OldY],
                [OldX + 200, OldY],
              ],
              eX,
              eY,
              OldX,
              OldY
            )
          ) {
            tr(canvasRef, angle);
          } else if (
            JudgePoint(
              [
                [OldX - 12, OldY - 12],
                [OldX, OldY - 12],
                [OldX, OldY],
                [OldX - 12, OldY],
              ],
              eX,
              eY,
              OldX,
              OldY
            )
          ) {
            tl(canvasRef, angle);
          } else if (
            JudgePoint(
              [
                [OldX + 94, OldY - 12],
                [OldX + 106, OldY - 12],
                [OldX + 106, OldY],
                [OldX + 94, OldY],
              ],
              eX,
              eY,
              OldX,
              OldY
            )
          ) {
            tm(canvasRef, angle);
          } else if (
            JudgePoint(
              [
                [OldX - 12, OldY + 94],
                [OldX, OldY + 94],
                [OldX, OldY + 106],
                [OldX - 12, OldY + 106],
              ],
              eX,
              eY,
              OldX,
              OldY
            )
          ) {
            ml(canvasRef, angle);
          } else if (
            JudgePoint(
              [
                [OldX + 200, OldY + 94],
                [OldX + 212, OldY + 94],
                [OldX + 212, OldY + 106],
                [OldX + 200, OldY + 106],
              ],
              eX,
              eY,
              OldX,
              OldY
            )
          ) {
            mr(canvasRef, angle);
          } else if (
            JudgePoint(
              [
                [OldX - 12, OldY + 200],
                [OldX, OldY + 200],
                [OldX, OldY + 212],
                [OldX - 12, OldY + 212],
              ],
              eX,
              eY,
              OldX,
              OldY
            )
          ) {
            bl(canvasRef, angle);
          } else if (
            JudgePoint(
              [
                [OldX + 94, OldY + 200],
                [OldX + 106, OldY + 200],
                [OldX + 106, OldY + 212],
                [OldX + 94, OldY + 212],
              ],
              eX,
              eY,
              OldX,
              OldY
            )
          ) {
            bm(canvasRef, angle);
          } else if (
            JudgePoint(
              [
                [OldX + 200, OldY + 200],
                [OldX + 212, OldY + 200],
                [OldX + 212, OldY + 212],
                [OldX + 200, OldY + 212],
              ],
              eX,
              eY,
              OldX,
              OldY
            )
          ) {
            br(canvasRef, angle);
          } else if (
            JudgePoint(
              [
                [
                  // 计算旋转之后锁定区域的坐标
                  OldX,
                  OldY,
                ],
                [OldX + 200, OldY],
                [OldX + 200, OldY + 200],
                [OldX, OldY + 200],
              ],
              eX,
              eY,
              OldX,
              OldY
            )
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
          let OldX = changeOldX.current;
          let OldY = changeOldY.current;
          //判断鼠标是否在点击区域内？
          if (
            JudgePoint(
              [
                [OldX, OldY],
                [OldX + 200, OldY],
                [OldX + 206, OldY + 200],
                [OldX, OldY + 200],
              ],
              eX,
              eY,
              OldX,
              OldY
            )
          ) {
            //鼠标移动
            canvasRef.current.onmousemove = (e) => {
              const scale = (e.movementX + e.movementY) / 2;
              let eX = e.clientX - left;
              let eY = e.clientY - top;
              //更新图片坐标的位置
              initCanvas(canvasRef.current, canvas2Ref.current).rotateImage(
                rotateValue,
                50,
                changeX.current,
                changeY.current,
                0 //不进行缩放
              );
              changeX.current = eX - xD;
              changeY.current = eY - yD;
              canvasRef.current.onmouseup = () => {
                //鼠标再次抬起更新可点击区域的坐标
                changeOldX.current = changeX.current;
                changeOldY.current = changeY.current;
                initCanvas(canvasRef.current, canvas2Ref.current).clear2();
                canvasRef.current.onmousemove = null;
              };
            };
          }
          //如果点击的是在左上角
          if (
            JudgePoint(
              [
                [OldX - 6, OldY - 6],
                [OldX + 6, OldY - 6],
                [OldX + 6, OldY + 6],
                [OldX - 6, OldY + 6],
              ],
              eX,
              eY,
              OldX,
              OldY
            )
          ) {
            canvasRef.current.onmousemove = (e) => {
              const scale = (e.movementX + e.movementY) / 2;
              let eX = e.clientX - left;
              let eY = e.clientY - top;
              //更新图片坐标的位置
              initCanvas(canvasRef.current, canvas2Ref.current).rotateImage(
                rotateValue,
                50,
                changeX.current,
                changeY.current,
                scale
              );
              changeX.current = eX - xD;
              changeY.current = eY - yD;

              canvasRef.current.onmouseup = () => {
                //鼠标再次抬起更新可点击区域的坐标
                changeOldX.current = changeX.current;
                changeOldY.current = changeY.current;
                initCanvas(canvasRef.current, canvas2Ref.current).clear2();
                // initCanvas(canvasRef.current, canvas2Ref.current).drawBorder(
                //   changeX.current,
                //   changeY.current,
                //   rotateValue,
                //   0
                // );
                canvasRef.current.onmousemove = null;
              };
            };
          } else if (
            JudgePoint(
              [
                [OldX, OldY],
                [OldX + 200, OldY],
                [OldX + 200, OldY + 200],
                [OldX, OldY + 200],
              ],
              eX,
              eY,
              OldX,
              OldY
            )
          ) {
            canvasRef.current.style = "cursor:move";
          } else {
            canvasRef.current.style = "cursor:default";
          }
        }}
      ></canvas>
    </div>
  );
}

export default Canvas;

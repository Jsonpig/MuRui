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
  const JudgePoint = (point, eX, eY, OldX, OldY, iWidth, iHeight) => {
    const touch = [eX, eY];
    const pointArr = []; //接收传入进来的数组
    point.forEach((item) => {
      pointArr.push([
        (item[0] - OldX - iWidth / 2) * Math.cos(angle) -
          (item[1] - OldY - iHeight / 2) * Math.sin(angle) +
          changeX.current +
          iWidth / 2,
        (item[0] - OldX - iWidth / 2) * Math.sin(angle) +
          (item[1] - OldY - iHeight / 2) * Math.cos(angle) +
          changeY.current +
          iHeight / 2,
      ]);
    });

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
              changeY.current,
              imgWidth.current,
              imgHeight.current
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
          //点击就绘制
          if (
            JudgePoint(
              [
                [OldX, OldY],
                [OldX + imgWidth.current, OldY],
                [OldX + imgWidth.current, OldY + imgHeight.current],
                [OldX, OldY + imgHeight.current],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
            )
          ) {
            initCanvas(canvasRef.current, canvas2Ref.current).rotateImage(
              rotateValue,
              50,
              changeX.current,
              changeY.current,
              imgWidth.current,
              imgHeight.current
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
                [OldX + imgWidth.current, OldY - 12],
                [OldX + imgWidth.current + 12, OldY - 12],
                [OldX + imgWidth.current + 12, OldY],
                [OldX + imgWidth.current, OldY],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
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
              OldY,
              imgWidth.current,
              imgHeight.current
            )
          ) {
            tl(canvasRef, angle);
          } else if (
            JudgePoint(
              [
                [OldX + imgWidth.current / 2 - 6, OldY - 12],
                [OldX + imgWidth.current / 2 + 6, OldY - 12],
                [OldX + imgWidth.current / 2 + 6, OldY],
                [OldX + imgWidth.current / 2 - 6, OldY],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
            )
          ) {
            tm(canvasRef, angle);
          } else if (
            JudgePoint(
              [
                [OldX - 12, OldY + imgHeight.current / 2 - 6],
                [OldX, OldY + imgHeight.current / 2 - 6],
                [OldX, OldY + imgHeight.current / 2 + 6],
                [OldX - 12, OldY + imgHeight.current / 2 + 6],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
            )
          ) {
            ml(canvasRef, angle);
          } else if (
            JudgePoint(
              [
                [OldX + imgWidth.current, OldY + imgHeight.current / 2 - 6],
                [
                  OldX + imgWidth.current + 12,
                  OldY + imgHeight.current / 2 - 6,
                ],
                [
                  OldX + imgWidth.current + 12,
                  OldY + imgHeight.current / 2 + 6,
                ],
                [OldX + imgWidth.current, OldY + imgHeight.current / 2 + 6],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
            )
          ) {
            mr(canvasRef, angle);
          } else if (
            JudgePoint(
              [
                [OldX - 12, OldY + imgHeight.current],
                [OldX, OldY + imgHeight.current],
                [OldX, OldY + imgHeight.current + 12],
                [OldX - 12, OldY + imgHeight.current + 12],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
            )
          ) {
            bl(canvasRef, angle);
          } else if (
            JudgePoint(
              [
                [OldX + imgWidth.current / 2 - 6, OldY + imgHeight.current],
                [OldX + imgWidth.current / 2 + 6, OldY + imgHeight.current],
                [
                  OldX + imgWidth.current / 2 + 6,
                  OldY + imgHeight.current + 12,
                ],
                [
                  OldX + imgWidth.current / 2 - 6,
                  OldY + imgHeight.current + 12,
                ],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
            )
          ) {
            bm(canvasRef, angle);
          } else if (
            JudgePoint(
              [
                [OldX + imgWidth.current, OldY + imgHeight.current],
                [OldX + imgWidth.current + 12, OldY + imgHeight.current],
                [OldX + imgWidth.current + 12, OldY + imgHeight.current + 12],
                [OldX + imgWidth.current, OldY + imgHeight.current + 12],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
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
                [OldX + imgWidth.current, OldY],
                [OldX + imgWidth.current, OldY + imgHeight.current],
                [OldX, OldY + imgHeight.current],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
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
          const sizeStep = (type, centerX, centerY) => {
            canvasRef.current.onmousemove = (e) => {
              let scale = (e.movementX + e.movementY) / 2;
              // 图片宽高
              switch (type) {
                case "tl":
                  imgWidth.current -= scale * 2 || 1;
                  imgHeight.current -= scale * 2 || 1;
                  break;
                case "tr":
                  scale = (e.movementX - e.movementY) / 2;
                  imgWidth.current += scale * 2 || 1;
                  imgHeight.current += scale * 2 || 1;
                  break;
                case "bl":
                  scale = (e.movementX - e.movementY) / 2;
                  imgWidth.current -= scale * 2 || 1;
                  imgHeight.current -= scale * 2 || 1;
                  break;
                case "br":
                  imgWidth.current += scale * 2 || 1;
                  imgHeight.current += scale * 2 || 1;
                  break;
              }
              //更新图片坐标的位置
              initCanvas(canvasRef.current, canvas2Ref.current).changeImageSize(
                rotateValue,
                changeX.current,
                changeY.current,
                centerX,
                centerY,
                imgWidth.current,
                imgHeight.current
              );
              canvasRef.current.onmouseup = () => {
                canvasRef.current.onmousemove = null;
              };
            };
          };
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
                [OldX + imgWidth.current, OldY],
                [OldX + imgWidth.current, OldY + imgHeight.current],
                [OldX, OldY + imgHeight.current],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
            )
          ) {
            //鼠标移动
            canvasRef.current.onmousemove = (e) => {
              let eX = e.clientX - left;
              let eY = e.clientY - top;
              //更新图片坐标的位置
              initCanvas(canvasRef.current, canvas2Ref.current).rotateImage(
                rotateValue,
                50,
                changeX.current,
                changeY.current,
                imgWidth.current,
                imgHeight.current
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
          switch (true) {
            //如果点击的是在左上角
            case JudgePoint(
              [
                [OldX - 6, OldY - 6],
                [OldX + 6, OldY - 6],
                [OldX + 6, OldY + 6],
                [OldX - 6, OldY + 6],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
            ):
              sizeStep(
                "tl",
                eX + imgWidth.current / 2,
                eY + imgHeight.current / 2
              );
              break;
            //点击点在右下角
            case JudgePoint(
              [
                [OldX + imgWidth.current, OldY + imgHeight.current],
                [OldX + imgWidth.current + 12, OldY + imgHeight.current],
                [OldX + imgWidth.current + 12, OldY + imgHeight.current + 12],
                [OldX + imgWidth.current, OldY + imgHeight.current + 12],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
            ):
              sizeStep(
                "br",
                eX - imgWidth.current / 2,
                eY - imgHeight.current / 2
              );
              break;
            //点击在右上角
            case JudgePoint(
              [
                [OldX + imgWidth.current, OldY - 12],
                [OldX + imgWidth.current + 12, OldY - 12],
                [OldX + imgWidth.current + 12, OldY],
                [OldX + imgWidth.current, OldY],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
            ):
              sizeStep(
                "tr",
                eX - imgWidth.current / 2,
                eY + imgHeight.current / 2
              );
              break;
            //点击在左下角
            case JudgePoint(
              [
                [OldX - 12, OldY + imgHeight.current],
                [OldX, OldY + imgHeight.current],
                [OldX, OldY + imgHeight.current + 12],
                [OldX - 12, OldY + imgHeight.current + 12],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
            ):
              sizeStep(
                "bl",
                eX + imgWidth.current / 2,
                eY - imgHeight.current / 2
              );
              break;
            //在图片里面
            case JudgePoint(
              [
                [OldX, OldY],
                [OldX + imgWidth.current, OldY],
                [OldX + imgWidth.current, OldY + imgHeight.current],
                [OldX, OldY + imgHeight.current],
              ],
              eX,
              eY,
              OldX,
              OldY,
              imgWidth.current,
              imgHeight.current
            ):
              canvasRef.current.style = "cursor:move";
              break;
            default:
              canvasRef.current.style = "cursor:default";
              break;
          }
        }}
      ></canvas>
    </div>
  );
}

export default Canvas;

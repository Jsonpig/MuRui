import { fabric } from "fabric";

let isDrawing = false;
let removeObj = null;
const fabricDraw = (canvas,type) => {
  let clickX, clickY, moveX, moveY;
  const removeBefore = (canvasObj, type) => {
    if (removeObj) {
      canvas.remove(removeObj);
    }
    canvas.add(canvasObj);
    if (type === "文字") {
      canvasObj.enterEditing();
      canvasObj.hiddenTextarea.focus();
    }
    removeObj = canvasObj;
  };
  canvas.on("mouse:down", (event) => {
    clickX = event.e.offsetX;
    clickY = event.e.offsetY;
    isDrawing = true;
  });
  canvas.on("mouse:move", (event) => {
    moveX = event.e.offsetX;
    moveY = event.e.offsetY;
    if (isDrawing) {
  switch (type) {
    case "矩形":
          let rect = new fabric.Rect({
            left: clickX,
            top: clickY,
            fill: "skyblue",
            width: moveX - clickX,
            height: moveY - clickY,
          });
          removeBefore(rect,type);
      break;
    case "圆形":
          let circle = new fabric.Circle({
            left:
              moveX - clickX > 0 ? clickX : clickX - Math.abs(moveX - clickX),
            top:
              moveY - clickY > 0 ? clickY : clickY - Math.abs(moveY - clickY),
            fill: "skyblue",
            radius:
              Math.abs((moveX - clickX) / 2) - Math.abs((moveY - clickY) / 2) >
              0
                ? Math.abs((moveY - clickY) / 2)
                : Math.abs((moveX - clickX) / 2),
          });
          removeBefore(circle);

      break;
    case "折线":

          let polyline = new fabric.Polyline(
            [
              {
                x: clickX,
                y: clickY,
              },
              {
                x: moveX,
                y: moveY,
              },
            ],
            {
              stroke: "green",
              selectable: false,
            }
          );
          removeBefore(polyline);
      break;
    case "文字":
          let text = new fabric.Textbox("", {
            left: clickX,
            top: clickY,
            stroke: "black",
            fontSize:
              Math.abs((moveX - clickX) / 2) - Math.abs((moveY - clickY) / 2) >
              0
                ? Math.abs((moveY - clickY) / 2)
                : Math.abs((moveX - clickX) / 2),
          });
          removeBefore(text, type);

      break;
    case "图形":
          fabric.Image.fromURL(
            "https://cdn2.mihuiai.com/6755023f-07ca-43ac-a5cd-24b142bafa98.png",
            (img) => {
              img.set({
                left:
                  moveX - clickX > 0
                    ? clickX
                    : clickX - Math.abs(moveX - clickX),
                top:
                  moveY - clickY > 0
                    ? clickY
                    : clickY - Math.abs(moveY - clickY),
                scaleX: (moveX - clickX) / img.width,
                scaleY: (moveY - clickY) / img.height,
              });
              removeBefore(img);
            }
          );
      break;
  }}})

  canvas.on("mouse:up", (event) => {
    if (isDrawing) {
      removeObj = null;
      isDrawing = false;
    }
  });
  //当对象被移动的时候 不触发绘制功能
  canvas.on("object:moving", () => {
    isDrawing = false;
  });
  canvas.on("object:scaling", () => {
    isDrawing = false;
  });
  canvas.on("object:rotating", () => {
    isDrawing = false;
  });
};

export default fabricDraw;

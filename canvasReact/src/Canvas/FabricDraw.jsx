import React, { useReducer } from "react";
import { isGroup, unGroup } from "../Tools/groupControl";
import rubber from "../Tools/rubber";
import patternBrush from "../Tools/PatternBrush";
import { applyFilter, applyFilterValue } from "../Tools/filer";
let fabric = window.fabric;

function FabricBox() {
  const canvas4Ref = React.useRef(null);
  let canvasFabric = null;
  let downX = 0;
  let downY = 0;
  let moveX = 0;
  let moveY = 0;
  let isDraw = false;
  let isText = false;
  let removeObj = null;
  let types = "";
  let stopDraw = true;
  let f = fabric.Image.filters;
  let $ = function (id) {
    return document.getElementById(id);
  };

  const isWantDraw = () => {
    stopDraw = !stopDraw;
  };

  //定义canvasFabric 只执行一次
  const fabricExist = () => {
    if (!canvasFabric) {
      canvasFabric = new fabric.Canvas("canvas3");
    }
  };
  const initEvent = () => {
    canvasFabric.on("mouse:down", (event) => {
      downX = event.e.offsetX;
      downY = event.e.offsetY;
      isDraw = true;
      isText = true;
    });

    canvasFabric.on("object:moving", () => {
      isDraw = false;
    });
    canvasFabric.on("object:rotating", () => {
      isDraw = false;
    });
    canvasFabric.on("object:scaling", () => {
      isDraw = false;
    });

    canvasFabric.on("mouse:move", (event) => {
      moveX = event.e.offsetX;
      moveY = event.e.offsetY;
      if (isDraw && stopDraw) {
        switch (types) {
          case "fabricRect":
            rect();
            break;
          case "fabricCircle":
            circle();
            break;
          case "fabricPloy":
            ploy();
            break;
          case "fabricText":
            text();
            break;
          case "fabricImg":
            img();
            break;
        }
      }
    });
    canvasFabric.on("mouse:up", () => {
      isDraw = false;
      removeObj = null;
    });
  };

  const rect = () => {
    let canvasObj = new fabric.Rect({
      left: downX,
      top: downY,
      width: moveX - downX,
      height: moveY - downY,
      fill: "green",
    });
    remove(canvasObj);
  };

  const circle = () => {
    let canvasObj = new fabric.Circle({
      left: moveX - downX > 0 ? downX : downX - Math.abs(moveX - downX),
      top: moveY - downY > 0 ? downY : downY - Math.abs(moveY - downY),
      fill: "green",
      radius:
        Math.abs((moveX - downX) / 2) - Math.abs((moveY - downY) / 2) > 0
          ? Math.abs((moveY - downY) / 2)
          : Math.abs((moveX - downX) / 2),
    });
    remove(canvasObj);
  };

  const ploy = () => {
    let points = [
      { x: downX, y: downY },
      { x: moveX, y: moveY },
    ];
    points.push({ x: downX, y: downY });

    let canvasObj = new fabric.Polyline(points, {
      fill: undefined,
      stroke: "green",
    });
    canvasObj.set("selectable", false);
    remove(canvasObj);
  };

  const text = () => {
    let textObj = new fabric.Textbox("", {
      left: moveX,
      top: downY,
      fill: "black",
      hasControls: true,
      editable: true,
      selectable: false,
    });
    if (isText) {
      canvasFabric.add(textObj);
      textObj.enterEditing();
      textObj.hiddenTextarea?.focus();
    } else {
      textObj.exitEditing();
      if (textObj.text === "") {
        canvasFabric.remove(textObj);
      }
      canvasFabric.renderAll();
      textObj = null;
      return;
    }
  };

  const img = () => {
    fabric.Image.fromURL(
      "https://cdn1.mihuiai.com/media/images/5ee5fd5a-f112-4b6b-b742-d58efeaa0775_thumb.png",
      (img) => {
        img.set({
          left: moveX - downX > 0 ? downX : downX - Math.abs(moveX - downX),
          top: moveY - downY > 0 ? downY : downY - Math.abs(moveY - downY),
          scaleX: (moveX - downX) / img.width,
          scaleY: (moveY - downY) / img.height,
        });
        remove(img);
      },
      {
        crossOrigin: "Anonymous",
      }
    );
  };
  const fabricType = (type) => {
    fabricExist();
    initEvent();
    if (types === type) return;
    types = type;
  };

  const remove = (canvasObj) => {
    if (removeObj) {
      canvasFabric.remove(removeObj);
    }
    canvasFabric.add(canvasObj);
    removeObj = canvasObj;
  };

  return (
    <div className="fabricDraw">
      <button
        onClick={() => {
          fabricType("fabricRect");
        }}
      >
        矩形
      </button>
      <button
        onClick={() => {
          fabricType("fabricCircle");
        }}
      >
        圆形
      </button>
      <button
        onClick={() => {
          fabricType("fabricPloy");
        }}
      >
        折线
      </button>
      <button
        onClick={() => {
          fabricType("fabricText");
        }}
      >
        文本
      </button>
      <button
        onClick={() => {
          fabricType("fabricImg");
        }}
      >
        图片
      </button>
      <button
        onClick={() => {
          patternBrush(canvasFabric);
        }}
      >
        画笔
      </button>
      <div>
        <button id="group" onClick={() => isGroup(canvasFabric)}>
          组合
        </button>
        <button id="ungroup" onClick={() => unGroup(canvasFabric)}>
          拆分
        </button>
        <button onClick={() => isWantDraw()}>绘制/停止</button>
        <div>
          <button
            id="rubber"
            onClick={() => rubber(canvasFabric, 5, "ControlBtn")}
          >
            橡皮擦
          </button>
          <input
            type="range"
            min={5}
            defaultValue={5}
            onChange={(e) => {
              rubber(canvasFabric, e.target.value, "valueBtn");
            }}
          />
        </div>
        <div></div>
        <div>
          <div>
            高光
            <input
              id="brightness"
              type="checkbox"
              onClick={() =>
                applyFilter(
                  5,
                  new f.Brightness({
                    brightness: parseFloat($("brightness-value").value),
                  }),
                  canvasFabric
                )
              }
            />
            <input
              type="range"
              id="brightness-value"
              min={-1}
              max={1}
              step={0.1}
              defaultValue={0}
              onChange={(e) => {
                applyFilterValue(
                  5,
                  "brightness",
                  parseFloat(e.target.value),
                  canvasFabric
                );
              }}
            />
          </div>
          <div>
            对比
            <input
              type="text"
              id="contrast"
              type="checkbox"
              onClick={() =>
                applyFilter(
                  5,
                  new f.Contrast({
                    contrast: parseFloat($("contrast-value").value),
                  }),
                  canvasFabric
                )
              }
            />
            <input
              id="contrast-value"
              type="range"
              min={-1}
              max={1}
              step={0.1}
              defaultValue={0}
              onChange={(e) => {
                applyFilterValue(
                  5,
                  "contrast",
                  parseFloat(e.target.value),
                  canvasFabric
                );
              }}
            />
          </div>
          <div>
            饱和
            <input
              id="saturation"
              type="checkbox"
              onClick={() =>
                applyFilter(
                  5,
                  new f.Saturation({
                    contrast: parseFloat($("saturation-value").value),
                  }),
                  canvasFabric
                )
              }
            />
            <input
              type="range"
              id="saturation-value"
              min={-1}
              max={1}
              step={0.1}
              defaultValue={0}
              onChange={(e) => {
                applyFilterValue(
                  5,
                  "saturation",
                  parseFloat(e.target.value),
                  canvasFabric
                );
              }}
            />
          </div>
        </div>
      </div>
      <canvas
        id="canvas3"
        ref={canvas4Ref}
        width="650px"
        height="730px"
      ></canvas>
    </div>
  );
}

export default FabricBox;

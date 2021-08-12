import React, { useState } from "react";
import { isGroup, unGroup } from "../Tools/groupControl";
import rubber from "../Tools/rubber";
import patternBrush from "../Tools/PatternBrush";
import filter from '../Tools/filer'
let fabric = window.fabric;
function FabricBox() {
  const [brushValue, setBrushValue] = useState("Pencil");
  const [widthValue, setwidthValue] = useState(10);
  let canvasFabric = new fabric.Canvas("canvas3");
  let downX = 0;
  let downY = 0;
  let moveX = 0;
  let moveY = 0;
  let isDraw = false;
  let isText = false;
  let removeObj = null;
  let types = "";

  const initEvent = () => {
    canvasFabric.on("mouse:down", (event) => {
      downX = event.e.offsetX;
      downY = event.e.offsetY;
      isDraw = true;
      isText = isText;
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
      if (isDraw) {
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
      fill: "",
      backgroundColor: "#fff",
      stroke: "black",
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
      textObj.set("backgroundColor", "rgba(0,0,0,0)");
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
      } ,{
        crossOrigin: 'Anonymous'
    }
    );
  };

  const fabricType = (type) => {
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
      <div>
        <button id="group" onClick={() => isGroup(canvasFabric)}>
          组合
        </button>
        <button id="ungroup" onClick={() => unGroup(canvasFabric)}>
          拆分
        </button>
        <div>
          <button id="rubber" onClick={() => rubber(canvasFabric)}>
            橡皮擦
          </button>
          <input type="range" min={1} max={20} step={1} defaultValue={1} />
        </div>
        <div>
          {" "}
          <button
            onClick={() => {
              patternBrush(canvasFabric, brushValue, widthValue);
            }}
          >
            画笔
          </button>
          模式
          <select
            onChange={(e) => {
              setBrushValue(e.target.value);
            }}
          >
            <option value="Pencil">Pencil</option>
            <option value="Circle">Circle</option>
            <option value="Spray">Spray</option>
          </select>
          行宽
          <input
            type="range"
            min={5}
            max={50}
            defaultValue={5}
            onChange={(e) => {
              setwidthValue(e.target.value);
            }}
          />
        </div>
        <div>
          <div>
            高光
             <input type="range"  min={-1} max={1} step={0.1} defaultValue={0} onChange = {(e)=>filter(canvasFabric,e.target.value,"高光")}/>
          </div>
          <div>
            对比
             <input type="range"  min={-1} max={1} step={0.1} defaultValue={0} onChange = {(e)=>filter(canvasFabric,e.target.value,"对比")}/>
          </div>
          <div>
            饱和
             <input type="range"  min={-1} max={1} step={0.1} defaultValue={0} onChange = {(e)=>filter(canvasFabric,e.target.value,"饱和")}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FabricBox;

import React, { useState } from "react";
import { initCanvas } from "../Tools/All";


function Image(props) {
  const { canvasDom,canvas2Dom,x,y,setX,setY} = props;
  const [imgUrl, setImgUrl] = useState(null);
  const [cWidth, setCWidth] = useState(100);
  const [cHeight, setCHeight] = useState(50);
  return (
    <li>
      图片
      <div>
        {" "}
        <input
          type="text"
          placeholder="输入图片地址"
          defaultValue = "ttps://cdn1.mihuiai.com/media/images/5ee5fd5a-f112-4b6b-b742-d58efeaa0775_thumb.png"
          onChange={(e) => {
            initCanvas(canvasDom,canvas2Dom).liImage(
              "图片",
              e.target.value,
              100,
              50,
              0,
              0
            );
            setImgUrl(e.target.value);
          }}
        />
      </div>
      <div id="imageFont">
        <div>
          切片X
          <span>
            <input
              type="range"
              onChange={(e) => {
                if (imgUrl) {
                  initCanvas(canvasDom,canvas2Dom).liImage(
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
                initCanvas(canvasDom,canvas2Dom).liImage(
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
                  initCanvas(canvasDom,canvas2Dom).liImage(
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
                  initCanvas(canvasDom,canvas2Dom).liImage(
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
      </div>
    </li>
  );
}

export default Image;

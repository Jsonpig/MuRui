import React, { useReducer } from "react";
import { initCanvas } from "../Tools/All";
import {initialState,reducer} from "../Tools/states"

function Image(props) {
  const { canvasDom, canvas2Dom, x, y, setX, setY } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <li>
      图片
      <div>
        {" "}
        <input
          type="text"
          placeholder="输入图片地址"
          defaultValue="ttps://cdn1.mihuiai.com/media/images/5ee5fd5a-f112-4b6b-b742-d58efeaa0775_thumb.png"
          onChange={(e) => {
            initCanvas(canvasDom, canvas2Dom).liImage(
              "图片",
              e.target.value,
              100,
              50,
              0,
              0
            );
            dispatch({ type: "changeImgUrl", imgUrl: e.target.value });
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
                if (state.imgUrl) {
                  initCanvas(canvasDom, canvas2Dom).liImage(
                    "图片",
                    state.imgUrl,
                    e.target.value,
                    state.cHeight,
                    x,
                    y
                  );
                  dispatch({ type: "changeCWidth", cWidth: e.target.value });
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
                if (state.imgUrl) dispatch({ type: "changeCHeight", cHeight: e.target.value });;
                initCanvas(canvasDom, canvas2Dom).liImage(
                  "图片",
                  state.imgUrl,
                  state.cWidth,
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
                if (state.imgUrl) {
                  setX(e.target.value);
                  initCanvas(canvasDom, canvas2Dom).liImage(
                    "图片",
                    state.imgUrl,
                    state.cWidth,
                    state.cHeight,
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
                if (state.imgUrl) {
                  setY(e.target.value);
                  initCanvas(canvasDom, canvas2Dom).liImage(
                    "图片",
                    state.imgUrl,
                    state.cWidth,
                    state.cHeight,
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

import React, { useReducer } from "react";
import { initCanvas, drawType } from "../Tools/All";
import { initialState, reducer } from "../Tools/states";

function ControlBroad(props) {
  const { canvasDom, canvas2Dom } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const selectMenRef = React.useRef(null);
  return (
    <div id="cotrolBroad">
      {/* 颜色 */}
      <div>
        颜色
        <input
          type="text"
          id="change"
          onChange={(e) =>
            dispatch({ type: "colorValue", colorValue: e.target.value })
          }
        />
        <button
          type="submit"
          id="changeColor"
          onClick={() =>
            initCanvas(canvasDom, canvas2Dom).changeColor(
              state.colorValue,
              state.sizeValue
            )
          }
        >
          提交
        </button>
      </div>
      {/* 大小 */}
      <div>
        大小
        <input
          type="range"
          onChange={(e) => {
            dispatch({ type: "sizeValue", sizeValue: e.target.value });
            initCanvas(canvasDom, canvas2Dom).changeSize(e.target.value);
          }}
        />
      </div>
      {/* 透明度 */}
      <div>
        透明度
        <input
          type="range"
          onChange={(e) => {
            dispatch({ type: "opacityValue", opacityValue: e.target.value });
            initCanvas(canvasDom, canvas2Dom).changeOpacity(
              e.target.value,
              state.sizeValue
            );
          }}
        />
      </div>
      {/* 旋转 */}
      <div>
        旋转
        <input
          type="range"
          onChange={(e) => {
            dispatch({
              type: "rotateValueInput",
              rotateValueInput: e.target.value,
            });
            initCanvas(canvasDom, canvas2Dom).rotateImage(
              state.rotateValueInput - e.target.value,
              state.sizeValue
            );
          }}
        />
      </div>
      {/* 蒙版 */}
      <div>
        蒙版
        <select
          ref={selectMenRef}
          onChange={(e) =>
            initCanvas(canvasDom, canvas2Dom).compositeOperation(
              e.target.value,
              drawType
            )
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
      </div>
      {/* 渐变 */}
      <div>
        渐变{" "}
        <input
          type="text"
          placeholder="色-色(圆)-色(矩）"
          onChange={(e) => {
            initCanvas(canvasDom, canvas2Dom).Gradient(
              drawType,
              state.sizeValue,
              e.target.value
            );
          }}
        />{" "}
      </div>
    </div>
  );
}

export default ControlBroad;

import React, { useState } from "react";
import { initCanvas,drawType } from "../Tools/All";

function ControlBroad(props) {
  const { canvasDom,canvas2Dom } = props;
  const [value, setValue] = useState("black");
  const [value2, setValue2] = useState(50);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(50);
  const selectMenRef = React.useRef(null);
  return (
    <div id="cotrolBroad">
      {/* 颜色 */}
      <div>
        颜色
        <input
          type="text"
          id="change"
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          id="changeColor"
          onClick={() => initCanvas(canvasDom,canvas2Dom).changeColor(value, value2)}
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
            setValue2(e.target.value);
            initCanvas(canvasDom,canvas2Dom).changeSize(e.target.value);
          }}
        />
      </div>
      {/* 透明度 */}
      <div>
        透明度
        <input
          type="range"
          onChange={(e) => {
            setValue3(e.target.value);
            initCanvas(canvasDom,canvas2Dom).changeOpacity(e.target.value, value2);
          }}
        />
      </div>
      {/* 旋转 */}
      <div>
        旋转
        <input
          type="range"
          onChange={(e) => {
            setValue4(e.target.value);
            initCanvas(canvasDom,canvas2Dom).rotateImage(value4 - e.target.value, value2);
          }}
        />
      </div>
      {/* 蒙版 */}
      <div>
        蒙版
        <select
          ref={selectMenRef}
          onChange={(e) =>
            initCanvas(canvasDom,canvas2Dom).compositeOperation(e.target.value, drawType)
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
            initCanvas(canvasDom,canvas2Dom).Gradient(drawType, value2, e.target.value);
          }}
        />{" "}
      </div>
    </div>
  );
}

export default ControlBroad;

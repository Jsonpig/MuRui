import React, { useState } from "react";
import { initCanvas } from "../Tools/All";

/* 阴影 */
function Shadow(props) {
  const { canvasDom, canvas2Dom } = props;
  const [value2, setValue2] = useState(50);
  const [value5, setValue5] = useState(0);
  const [valueX, setValueX] = useState(0);
  const [valueY, setValueY] = useState(0);
  const [valueColor, setValueColor] = useState(null);
  return (
    <div id="shadow">
      <div>
        {" "}
        <strong>阴影</strong>
      </div>
      <div>
        偏移X <input type="text" onChange={(e) => setValueX(e.target.value)} />
        <button
          type="submit"
          onClick={() =>
            initCanvas(canvasDom, canvas2Dom).shadow(
              value5,
              value2,
              valueX,
              valueY,
              valueColor
            )
          }
        >
          提交
        </button>
      </div>
      <div>
        {" "}
        偏移Y <input type="text" onChange={(e) => setValueY(e.target.value)} />
        <button
          type="submit"
          onClick={() =>
            initCanvas(canvasDom, canvas2Dom).shadow(
              value5,
              value2,
              valueX,
              valueY,
              valueColor
            )
          }
        >
          提交
        </button>
      </div>
      <div>
        {" "}
        阴影{" "}
        <input type="text" onChange={(e) => setValueColor(e.target.value)} />
        <button
          type="submit"
          onClick={() =>
            initCanvas(canvasDom, canvas2Dom).shadow(
              value5,
              value2,
              valueX,
              valueY,
              valueColor
            )
          }
        >
          提交
        </button>
      </div>
      <div>
        {" "}
        模糊度
        <input
          type="range"
          onChange={(e) => {
            setValue5(e.target.value);
            initCanvas(canvasDom, canvas2Dom).shadow(
              value5,
              value2,
              valueX,
              valueY
            );
          }}
        />
      </div>
    </div>
  );
}

export default Shadow;

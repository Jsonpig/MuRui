import React, { useReducer } from "react";
import { initCanvas } from "../Tools/All";
import { reducer, initialState } from "../Tools/states";

/* 阴影 */
function Shadow(props) {
  const { canvasDom, canvas2Dom } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div id="shadow">
      <div>
        <strong>阴影</strong>
      </div>
      <div>
        偏移X <input type="text" onChange={(e) => dispatch({type:"valueX",valueX:e.target.value})} />
        <button
          type="submit"
          onClick={() =>
            initCanvas(canvasDom, canvas2Dom).shadow(
              state.ambiguityValue,
              state.sizeValue,
              state.valueX,
              state.valueY,
              state.shadowColorValue
            )
          }
        >
          提交
        </button>
      </div>
      <div>
        {" "}
        偏移Y <input type="text" onChange={(e) => dispatch({type:"valueY",valueY:e.target.value})} />
        <button
          type="submit"
          onClick={() =>
            initCanvas(canvasDom, canvas2Dom).shadow(
              state.ambiguityValue,
              state.sizeValue,
              state.valueX,
              state.valueY,
              state.shadowColorValue
            )
          }
        >
          提交
        </button>
      </div>
      <div>
        {" "}
        阴影{" "}
        <input
          type="text"
          onChange={(e) =>
            dispatch({
              type: "shadowColorValue",
              shadowColorValue: e.target.value,
            })
          }
        />
        <button
          type="submit"
          onClick={() =>
            initCanvas(canvasDom, canvas2Dom).shadow(
              state.ambiguityValue,
              state.sizeValue,
              state.valueX,
              state.valueY,
              state.shadowColorValue
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
            dispatch({
              type: "ambiguityValue",
              ambiguityValue: e.target.value,
            });
            initCanvas(canvasDom, canvas2Dom).shadow(
              state.ambiguityValue,
              state.sizeValue,
              state.valueX,
              state.valueY
            );
          }}
        />
      </div>
    </div>
  );
}

export default Shadow;

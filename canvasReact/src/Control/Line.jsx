import React,{useReducer}from "react"
import { initCanvas,drawType} from "../Tools/All";
import { initialState, reducer } from "../Tools/states";

function Line (props){
  const [state,dispatch] = useReducer(reducer,initialState)
    const selectRef = React.useRef(null);
    const {canvasDom,canvas2Dom} = props

    return(
        <div id="line">
        <strong>直线方法</strong>
        <div>
          线宽
          <input
            type="range"
            onChange={(e) => {
              dispatch({type:"lineWidthValue",lineWidthValue:e.target.value});
              if (drawType === "直线") {
                initCanvas(canvasDom,canvas2Dom).drawLine(drawType, state.lineWidthValue);
              } else if (drawType === "二次") {
                initCanvas(canvasDom,canvas2Dom).drawCurveTo("二次", state.lineWidthValue);
              } else if (drawType === "三次") {
                initCanvas(canvasDom,canvas2Dom).drawCurveTo("三次", state.lineWidthValue);
              }
            }}
          />
        </div>
        <div>
          末端样式{" "}
          <select
            name="modle"
            ref={selectRef}
            onChange={(e) => {
              const checked = e.target.value;
              if (drawType === "直线") {
                initCanvas(canvasDom,canvas2Dom).drawLine("直线", state.lineWidthValue, checked);
              }
            }}
          >
            <option value="butt">方形</option>
            <option value="round">圆形</option>
            <option value="square">区域</option>
          </select>
        </div>
        <div>
          接合处样式
          <select
            ref={selectRef}
            onChange={(e) => {
              dispatch({type:"lineStyle",lineStyle:e.target.value});
              if (drawType === "直线") {
                initCanvas(canvasDom,canvas2Dom).drawLine(
                  "直线",
                  state.lineWidthValue,
                  null,
                  e.target.value
                );
              }
            }}
          >
            <option value="bevel">bevel</option>
            <option value="round">round</option>
            <option value="miter">miter</option>
          </select>
        </div>
        <div>
          绘制虚线
          <div>
            {" "}
            <input
              type="text"
              placeholder="实线长"
              onChange={(e) => {
                dispatch({type:"lineDashA",lineDashA:e.target.value});
                if (drawType === "直线") {
                  initCanvas(canvasDom,canvas2Dom).drawLine(
                    "直线",
                    state.lineWidthValue,
                    null,
                    state.lineStyle,
                    e.target.value,
                    state.lineDashB,
                    state.lineDashOffset
                  );
                }
              }}
            />{" "}
            <input
              type="text"
              placeholder="虚线长"
              onChange={(e) => {
                if (drawType === "直线") {
                  dispatch({type:"lineDashB",lineDashB:e.target.value});
                  initCanvas(canvasDom,canvas2Dom).drawLine(
                    "直线",
                    state.lineWidthValue,
                    null,
                    state.lineStyle,
                    state.lineDashA,
                    e.target.value,
                    state.lineDashOffset
                  );
                }
              }}
            />{" "}
            <input
              type="text"
              placeholder="起始位置"
              onChange={(e) => {
                if (drawType === "直线") {
                  dispatch({type:"lineDashOffset",lineDashOffset:e.target.value});
                  initCanvas(canvasDom,canvas2Dom).drawLine(
                    "直线",
                    state.lineWidthValue,
                    null,
                    state.lineStyle,
                    state.lineDashA,
                    state.lineDashB,
                    e.target.value
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
    )
}

export default Line
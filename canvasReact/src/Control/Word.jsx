import React, { useReducer } from "react";
import { initCanvas } from "../Tools/All";
import { reducer, initialState } from "../Tools/states";
/* 字体 */
function Word(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {canvasDom ,canvas2Dom,writeText} = props
  return (
    <div id="word">
      <div><strong>文本操作</strong></div>
      <div>
        {" "}
        字号
        <input type="text" onChange={(e) => dispatch({type:"fontSize",fontSize:e.target.value})} />
        <button
          type="submit"
          onClick={() =>
            initCanvas(canvasDom,canvas2Dom).changeTextSize("文本", writeText, state.fontSize)
          }
        >
          提交
        </button>
      </div>
      <div>
        {" "}
        字体
        <select
          onChange={(e) => {
            (e) => dispatch({type:"textValue",textValue:e.target.value})
            initCanvas(canvasDom,canvas2Dom).changeTextSize(
              "文本",
              writeText,
              state.fontSize,
              e.target.value
            );
          }}
        >
          <option value="微软雅黑">微软雅黑</option>
          <option value="楷体">楷体</option>
        </select>
      </div>
      <div>
        {" "}
        对齐方式
        <select
          onChange={(e) => {
            dispatch({type:"textQi",textQi:e.target.value});
            initCanvas(canvasDom,canvas2Dom).changeTextSize(
              "文本",
              writeText,
              state.fontSize,
              state.textValue,
              e.target.value
            );
          }}
        >
          <option value="start">start</option>
          <option value="end">end</option>
          <option value="left">left</option>
          <option value="right ">right </option>
          <option value="center">center</option>
        </select>
      </div>
      <div>
        {" "}
        文本方向
        <select
          onChange={(e) =>
            initCanvas(canvasDom,canvas2Dom).changeTextSize(
              "文本",
              writeText,
              state.fontSize,
              state.textValue,
              state.textQi,
              e.target.value
            )
          }
        >
          <option value="ltr">从左向右</option>
          <option value="rtl">从右向左</option>
        </select>
      </div>
    </div>
  );
}

export default Word;

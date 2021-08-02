import React from "react";
import { initCanvas } from "../Tools/All";
function TopWord(props) {
  const {canvasDom,canvas2Dom} = props
  return (
    <div id="TopWord">
      操作界面
      <button onClick={() => {
        initCanvas(canvasDom,canvas2Dom).clear()
        initCanvas(canvasDom,canvas2Dom).clear2()
      }}>清空画布</button>
    </div>
  );
}

export default TopWord

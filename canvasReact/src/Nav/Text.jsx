import React from "react";
import { initCanvas  } from "../Tools/All";

function Text(props) {
  const { canvasDom, canvas2Dom,getWriteText,writeText} = props
  return (
    <li>
      文本
      <div>
        <input
          type="text"
          placeholder="输入文本"
          onChange={(e) => {
            getWriteText(e.target.value);
          }}
        />{" "}
        <button
          type="submit"
          onClick={() => initCanvas(canvasDom,canvas2Dom).drawText("文本", writeText)}
        >
          提交
        </button>
      </div>
    </li>
  );
}

export default Text
import React from "react";
import { initCanvas } from "../Tools/All";

function BeiLine(props){
  const {canvasDom,canvas2Dom} = props
    return(
        <li>
        贝塞尔曲线
        <div>
          <button
            type="submit"
            onClick={() => initCanvas(canvasDom,canvas2Dom).drawCurveTo("二次")}
          >
            二次
          </button>
          <button
            type="submit"
            onClick={() => initCanvas(canvasDom,canvas2Dom).drawCurveTo("三次")}
          >
            三次
          </button>
        </div>
      </li>
    )
}

export default BeiLine
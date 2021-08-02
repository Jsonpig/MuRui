import React,{useState}from "react"
import { initCanvas,drawType} from "../Tools/All";

function Line (props){
    const selectRef = React.useRef(null);
    const {canvasDom,canvas2Dom} = props
    const [lineWidthValue, setLineWidthValue] = useState(0);
    const [lineStyle, setLineStyle] = useState("bevel");
    const [lineDashA, setLineDashA] = useState(0);
    const [lineDashB, setLineDashB] = useState(0);
    const [lineDashOffset, setLineDashOffset] = useState(0);
    return(
        <div id="line">
        <strong>直线方法</strong>
        <div>
          线宽
          <input
            type="range"
            onChange={(e) => {
              setLineWidthValue(e.target.value);
              if (drawType === "直线") {
                initCanvas(canvasDom,canvas2Dom).drawLine(drawType, lineWidthValue);
              } else if (drawType === "二次") {
                initCanvas(canvasDom,canvas2Dom).drawCurveTo("二次", lineWidthValue);
              } else if (drawType === "三次") {
                initCanvas(canvasDom,canvas2Dom).drawCurveTo("三次", lineWidthValue);
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
                initCanvas(canvasDom,canvas2Dom).drawLine("直线", lineWidthValue, checked);
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
              setLineStyle(e.target.value);
              if (drawType === "直线") {
                initCanvas(canvasDom,canvas2Dom).drawLine(
                  "直线",
                  lineWidthValue,
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
                setLineDashA(e.target.value);
                if (drawType === "直线") {
                  initCanvas(canvasDom,canvas2Dom).drawLine(
                    "直线",
                    lineWidthValue,
                    null,
                    lineStyle,
                    e.target.value,
                    lineDashB,
                    lineDashOffset
                  );
                }
              }}
            />{" "}
            <input
              type="text"
              placeholder="虚线长"
              onChange={(e) => {
                if (drawType === "直线") {
                  setLineDashB(e.target.value);
                  initCanvas(canvasDom,canvas2Dom).drawLine(
                    "直线",
                    lineWidthValue,
                    null,
                    lineStyle,
                    lineDashA,
                    e.target.value,
                    lineDashOffset
                  );
                }
              }}
            />{" "}
            <input
              type="text"
              placeholder="起始位置"
              onChange={(e) => {
                if (drawType === "直线") {
                  setLineDashOffset(e.target.value);
                  initCanvas(canvasDom,canvas2Dom).drawLine(
                    "直线",
                    lineWidthValue,
                    null,
                    lineStyle,
                    lineDashA,
                    lineDashB,
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
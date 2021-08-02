import React from "react";
import { btnDrawFun } from "../Tools/All";
function BasicImage(props) {
  const { canvasDom,canvas2Dom} = props;
  return (
    <div>
      <li onClick={() => btnDrawFun("矩形", canvasDom,canvas2Dom)}>矩形</li>
      <li onClick={() => btnDrawFun("圆形", canvasDom,canvas2Dom)}>圆形</li>
      <li onClick={() => btnDrawFun("三角形", canvasDom,canvas2Dom)}>三角形</li>
      <li onClick={() => btnDrawFun("直线", canvasDom,canvas2Dom)}>直线</li>
    </div>
  );
}

export default BasicImage;

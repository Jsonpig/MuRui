import React from "react";
import TopWord from "./TopWord";
import ControlBroad from "./ControlBroad";
import Shadow from "./Shadow";
import Word from "./Word";
import Line from "./Line";


//控制页面
function Control(props) {
  const { canvasDom,canvas2Dom, writeText } = props;
  return (
    <div id="control">
      <TopWord canvasDom = {canvasDom} canvas2Dom = {canvas2Dom}></TopWord>
      <ControlBroad canvasDom = {canvasDom} canvas2Dom={canvas2Dom}></ControlBroad>
      <Shadow canvasDom={canvasDom} canvas2Dom={canvas2Dom}></Shadow>
      <Word canvasDom={canvasDom} canvas2Dom={canvas2Dom} writeText = {writeText}></Word>
      <Line canvasDom={canvasDom} canvas2Dom = {canvas2Dom}></Line>
    </div>
  );
}

export default Control;

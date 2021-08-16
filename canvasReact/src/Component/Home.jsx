import React,{useState}from "react";
import NavigationBar from "../Nav/NavgationBar"
import Canvas from "../Canvas/Canvas";
import ColorChoose from "../ColorChoose/colorChoose";
import Control from "../Control/control";

const Home = () => {
  const [canvasDom, setCanvasDom] = useState(null);
  const [canvas2Dom, setCanvas2Dom] = useState(null);
  const [drawType, setDrawType] = useState(null);
  const [writeText, setwriteText] = useState(null);
  const [divHoveredDom, setDivHoveredDom] = useState(null);
  const [divSelectedDom, setDivSelectedDom] = useState(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  return (
    <main>
      <NavigationBar
        canvasDom={canvasDom}
        canvas2Dom={canvas2Dom}
        getdrawType={(type) => setDrawType(type)}
        getWriteText={(type) => setwriteText(type)}
        writeText={writeText}
        getX={(xValue) => setX(xValue)}
        getY={(yValue) => setY(yValue)}
      ></NavigationBar>
      <Control
        canvasDom={canvasDom}
        canvas2Dom={canvas2Dom}
        drawType={drawType}
        writeText={writeText}
      ></Control>
      <Canvas
        getCanvasDom={(dom) => setCanvasDom(dom)}
        getCanvas2Dom={(dom2) => setCanvas2Dom(dom2)}
        divHoveredDom={divHoveredDom}
        divSelectedDom={divSelectedDom}
        x={x}
        y={y}
      ></Canvas>
      <ColorChoose
        getDivHoveredDom={(dom) => setDivHoveredDom(dom)}
        getDivSelectedDom={(dom) => setDivSelectedDom(dom)}
      ></ColorChoose>
    </main>
  );
};

export default Home
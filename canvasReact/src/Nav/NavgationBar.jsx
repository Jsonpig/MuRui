import React, { useState, useRef, useEffect } from "react";
// import initCanvas from "../Tools/All";
import BasicImage from "./BasicImage";
import Text from "./Text";
import BeiLine from "./BeiLine";
import Image from "./Image";
//导航栏
function NavigationBar(props) {
  const { canvasDom, canvas2Dom, getWriteText, writeText, getX, getY } = props;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    getX(x);
    getY(y);
  }, [props]);
  return (
    <div className="navigationBar">
      <ul className="bar">
        <BasicImage canvasDom={canvasDom} canvas2Dom={canvas2Dom}></BasicImage>
        <Text
          canvasDom={canvasDom}
          canvas2Dom={canvas2Dom}
          getWriteText={getWriteText}
          writeText={writeText}
        ></Text>
        <BeiLine canvasDom={canvasDom} canvas2Dom={canvas2Dom}></BeiLine>
        <Image
          canvasDom={canvasDom}
          canvas2Dom={canvas2Dom}
          x={x}
          y={y}
          setX={setX}
          setY={setY}
        ></Image>
      </ul>
    </div>
  );
}

export default NavigationBar;

import React, {useEffect } from "react";
//颜色选择器
function ColorChoose(props) {
  const { getDivHoveredDom, getDivSelectedDom } = props;
  const divHoveredRef = React.useRef(null);
  const divSelectedRef = React.useRef(null);
  useEffect(() => {
    getDivHoveredDom(divHoveredRef.current);
  }, [props]);
  useEffect(() => {
    getDivSelectedDom(divSelectedRef.current);
  }, [props]);
  return (
    <div className="color-choose">
      颜色选择器
      <div>
        <div id="hovered-color" ref={divHoveredRef}>
          点击获取
        </div>
        <div id="selected-color" ref={divSelectedRef}>
          实时获取
        </div>
      </div>
    </div>
  );
}

export default ColorChoose;

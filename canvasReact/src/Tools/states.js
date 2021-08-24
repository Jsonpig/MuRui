const initialState = {
  imgUrl: null,
  cWidth: 100,
  cHeight: 50,
  colorValue: "black",
  sizeValue: 50,
  opacityValue: 0,
  rotateValueInput: 50,
  lineWidthValue: 0,
  lineStyle: "bevel",
  lineDashA: 0,
  lineDashB: 0,
  lineDashOffset: 0,
  ambiguityValue: 50, //阴影的模糊度
  valueX: 0,
  valueY: 0,
  shadowValueColor: null,

  textValue: "微软雅黑",
  fontSize: null,
  textQi: "start",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "changeImgUrl":
      return {
        ...state,
        imgUrl: action.imgUrl,
      };
    case "changeCWidth":
      return {
        ...state,
        cWidth: action.cWidth,
      };
    case "changeCHeight":
      return {
        ...state,
        cHeight: action.cHeight,
      };
    case "colorValue":
      return {
        ...state,
        colorValue: action.colorValue,
      };
    case "sizeValue":
      return {
        ...state,
        sizeValue: action.sizeValue,
      };
    case "opacityValue":
      return {
        ...state,
        opacityValue: action.opacityValue,
      };
    case "rotateValueInput":
      return {
        ...state,
        rotateValueInput: action.rotateValueInput,
      };
    case "lineWidthValue":
      return {
        ...state,
        lineWidthValue: action.lineWidthValue,
      };
    case "lineStyle":
      return {
        ...state,
        lineStyle: action.lineStyle,
      };
    case "lineDashA":
      return {
        ...state,
        lineDashA: action.lineDashA,
      };
    case "lineDashB":
      return {
        ...state,
        lineDashB: action.lineDashB,
      };
    case "lineDashOffset":
      return {
        ...state,
        lineDashOffset: action.lineDashOffset,
      };
    case "shadowColorValue":
      return {
        ...state,
        shadowColorValue: action.shadowColorValue,
      };
    case "ambiguityValue":
      return {
        ...state,
        ambiguityValue: action.ambiguityValue,
      };
    case "valueX":
      return {
        ...state,
        valueX: action.valueX,
      };
    case "valueY":
      return {
        ...state,
        valueY: action.valueY,
      };
    case "textValue":
      return {
        ...state,
        textValue: action.textValue,
      };
    case "fontSize":
      return {
        ...state,
        fontSize: action.fontSize,
      };
    case "textQi":
      return {
        ...state,
        textQi: action.textQi,
      };
    default:
      throw new Error();
  }
};

export { initialState, reducer };


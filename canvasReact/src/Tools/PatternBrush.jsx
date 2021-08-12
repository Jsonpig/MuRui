
const patternBrush = (canvas, value, widthValue) => {
  if (canvas.isDrawingMode) {
    canvas.isDrawingMode = false;
  } else {
    canvas.isDrawingMode = true;
  }
  //设置画笔模式
  if (value === "Pencil") {
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
  } else if (value === "Circle") {
    canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
  } else if (value === "Spray") {
    canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
  }
  //设置颜色大小
  canvas.freeDrawingBrush.color = "skyblue";
  canvas.freeDrawingBrush.width = parseInt(widthValue);
};

export default patternBrush;

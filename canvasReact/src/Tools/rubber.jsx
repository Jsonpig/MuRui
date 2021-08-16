const rubber = (canvas, rubberValue, type) => {
  if (type === "ControlBtn") {
    if (canvas.isDrawingMode) {
      canvas.isDrawingMode = false;
    } else {
      canvas.isDrawingMode = true;
    }
  }else{
    if (canvas.isDrawingMode) {
      canvas.isDrawingMode = true;
    } else {
      canvas.isDrawingMode = false;
    }
  }
  canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
  canvas.freeDrawingBrush.width = Number(rubberValue);
};

export default rubber;

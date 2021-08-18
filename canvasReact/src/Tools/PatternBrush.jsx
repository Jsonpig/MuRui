const patternBrush = (canvas) => {
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
  //设置颜色大小
  canvas.freeDrawingBrush.color = "skyblue";
  canvas.freeDrawingBrush.width = parseInt(Number(10));
};

export default patternBrush;

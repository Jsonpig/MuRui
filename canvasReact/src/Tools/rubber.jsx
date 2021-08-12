
const rubber = (canvas)=>{

    if(canvas.isDrawingMode){
      canvas.isDrawingMode = false
    }else {
      canvas.isDrawingMode =true
    }
  canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
  canvas.freeDrawingBrush.width = 30;
}

export default rubber

const isGroup = (canvas)=>{
    if (!canvas.getActiveObject()) {
        return;
      }
      if (canvas.getActiveObject().type !== 'activeSelection') {
        return;
      }
      canvas.getActiveObject().toGroup();
      canvas.requestRenderAll();

}


export default isGroup



//实现滤镜

const filter = (canvas, value, type) => {
  var obj = canvas.getActiveObject();
  if (obj) {
    if (type === null) {
      return;
    }
    if (type === "高光") {
      obj.filters.push(
        new fabric.Image.filters.Brightness({ brightness: value })
      );
    } else if (type === "对比") {
      obj.filters.push(new fabric.Image.filters.Contrast({ contrast: value }));
      obj.applyFilters();
      canvas.renderAll();
    } else if (type === "饱和") {
      obj.filters.push(
        new fabric.Image.filters.Saturation({ saturation: value })
      );
      obj.applyFilters();
      canvas.renderAll();
    }
  }
};

export default filter;

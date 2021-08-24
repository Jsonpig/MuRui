//实现滤镜

function applyFilter(index, filter,canvas) {
  let obj = canvas.getActiveObject();
  if(obj){
    obj.filters[index] = filter;
    obj.applyFilters();
    canvas.renderAll();
  }
}

function applyFilterValue(index, prop, value,canvas) {
  let obj = canvas.getActiveObject();
  if(obj){
    if (obj.filters[index]) {
      obj.filters[index][prop] = value;
      obj.applyFilters();
      canvas.renderAll();
    }
  }
 

}


export  {applyFilter,applyFilterValue};

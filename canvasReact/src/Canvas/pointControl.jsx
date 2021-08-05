//8个顶点的箭头指向判断
const tr = (canvasRef, angle) => {
  if (angle <= Math.PI / 6) {
    canvasRef.current.style = "cursor:ne-resize";
  } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
    canvasRef.current.style = "cursor:e-resize";
  } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:se-resize";
  } else if (angle > (2 * Math.PI) / 3 && angle <= (5 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:s-resize";
  } else if (angle > (5 * Math.PI) / 6 && angle <= (7 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:sw-resize";
  } else if (angle > (7 * Math.PI) / 6 && angle <= (4 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:w-resize";
  } else if (angle > (4 * Math.PI) / 3 && angle <= (5 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:nw-resize";
  } else if (angle > (5 * Math.PI) / 3 && angle <= (11 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:n-resize";
  } else {
    canvasRef.current.style = "cursor:ne-resize";
  }
};

const tl = (canvasRef, angle) => {
  if (angle <= Math.PI / 6) {
    canvasRef.current.style = "cursor:nw-resize";
  } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
    canvasRef.current.style = "cursor:n-resize";
  } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:ne-resize";
  } else if (angle > (2 * Math.PI) / 3 && angle <= (5 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:e-resize";
  } else if (angle > (5 * Math.PI) / 6 && angle <= (7 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:se-resize";
  } else if (angle > (7 * Math.PI) / 6 && angle <= (4 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:s-resize";
  } else if (angle > (4 * Math.PI) / 3 && angle <= (5 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:sw-resize";
  } else if (angle > (5 * Math.PI) / 3 && angle <= (11 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:w-resize";
  } else {
    canvasRef.current.style = "cursor:nw-resize";
  }
};

const tm = (canvasRef, angle) => {
  if (angle <= Math.PI / 6) {
    canvasRef.current.style = "cursor:n-resize";
  } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
    canvasRef.current.style = "cursor:ne-resize";
  } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:e-resize";
  } else if (angle > (2 * Math.PI) / 3 && angle <= (5 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:se-resize";
  } else if (angle > (5 * Math.PI) / 6 && angle <= (7 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:s-resize";
  } else if (angle > (7 * Math.PI) / 6 && angle <= (4 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:sw-resize";
  } else if (angle > (4 * Math.PI) / 3 && angle <= (5 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:w-resize";
  } else if (angle > (5 * Math.PI) / 3 && angle <= (11 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:nw-resize";
  } else {
    canvasRef.current.style = "cursor:n-resize";
  }
};

const ml = (canvasRef, angle) => {
  if (angle <= Math.PI / 6) {
    canvasRef.current.style = "cursor:w-resize";
  } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
    canvasRef.current.style = "cursor:nw-resize";
  } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:n-resize";
  } else if (angle > (2 * Math.PI) / 3 && angle <= (5 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:ne-resize";
  } else if (angle > (5 * Math.PI) / 6 && angle <= (7 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:e-resize";
  } else if (angle > (7 * Math.PI) / 6 && angle <= (4 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:se-resize";
  } else if (angle > (4 * Math.PI) / 3 && angle <= (5 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:s-resize";
  } else if (angle > (5 * Math.PI) / 3 && angle <= (11 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:sw-resize";
  } else {
    canvasRef.current.style = "cursor:w-resize";
  }
};

const mr = (canvasRef, angle) => {
  if (angle <= Math.PI / 6) {
    canvasRef.current.style = "cursor:e-resize";
  } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
    canvasRef.current.style = "cursor:se-resize";
  } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:s-resize";
  } else if (angle > (2 * Math.PI) / 3 && angle <= (5 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:sw-resize";
  } else if (angle > (5 * Math.PI) / 6 && angle <= (7 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:w-resize";
  } else if (angle > (7 * Math.PI) / 6 && angle <= (4 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:nw-resize";
  } else if (angle > (4 * Math.PI) / 3 && angle <= (5 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:n-resize";
  } else if (angle > (5 * Math.PI) / 3 && angle <= (11 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:ne-resize";
  } else {
    canvasRef.current.style = "cursor:e-resize";
  }
};

const bl = (canvasRef, angle) => {
  if (angle <= Math.PI / 6) {
    canvasRef.current.style = "cursor:sw-resize";
  } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
    canvasRef.current.style = "cursor:w-resize";
  } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:nw-resize";
  } else if (angle > (2 * Math.PI) / 3 && angle <= (5 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:n-resize";
  } else if (angle > (5 * Math.PI) / 6 && angle <= (7 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:ne-resize";
  } else if (angle > (7 * Math.PI) / 6 && angle <= (4 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:e-resize";
  } else if (angle > (4 * Math.PI) / 3 && angle <= (5 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:se-resize";
  } else if (angle > (5 * Math.PI) / 3 && angle <= (11 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:s-resize";
  } else {
    canvasRef.current.style = "cursor:sw-resize";
  }
};

const bm = (canvasRef, angle) => {
  if (angle <= Math.PI / 6) {
    canvasRef.current.style = "cursor:s-resize";
  } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
    canvasRef.current.style = "cursor:sw-resize";
  } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:w-resize";
  } else if (angle > (2 * Math.PI) / 3 && angle <= (5 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:nw-resize";
  } else if (angle > (5 * Math.PI) / 6 && angle <= (7 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:n-resize";
  } else if (angle > (7 * Math.PI) / 6 && angle <= (4 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:ne-resize";
  } else if (angle > (4 * Math.PI) / 3 && angle <= (5 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:e-resize";
  } else if (angle > (5 * Math.PI) / 3 && angle <= (11 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:se-resize";
  } else {
    canvasRef.current.style = "cursor:s-resize";
  }
};

const br = (canvasRef, angle) => {
  if (angle <= Math.PI / 6) {
    canvasRef.current.style = "cursor:se-resize";
  } else if (angle > Math.PI / 6 && angle <= Math.PI / 3) {
    canvasRef.current.style = "cursor:s-resize";
  } else if (angle > Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:sw-resize";
  } else if (angle > (2 * Math.PI) / 3 && angle <= (5 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:w-resize";
  } else if (angle > (5 * Math.PI) / 6 && angle <= (7 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:nw-resize";
  } else if (angle > (7 * Math.PI) / 6 && angle <= (4 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:n-resize";
  } else if (angle > (4 * Math.PI) / 3 && angle <= (5 * Math.PI) / 3) {
    canvasRef.current.style = "cursor:ne-resize";
  } else if (angle > (5 * Math.PI) / 3 && angle <= (11 * Math.PI) / 6) {
    canvasRef.current.style = "cursor:e-resize";
  } else {
    canvasRef.current.style = "cursor:se-resize";
  }
};
export { tr, tl, tm, ml, mr, bl, bm, br };

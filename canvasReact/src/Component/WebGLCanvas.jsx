import React, { useEffect } from "react";

const WebGLFilter = () => {
  const webglCanvasRef = React.useRef(null);

  useEffect(() => {
    const rangeS = document.getElementById("S"),
      rangeR = document.getElementById("R"),
      rangeG = document.getElementById("G"),
      rangeB = document.getElementById("B");
    const webgl = webglCanvasRef.current.getContext("webgl");

    //创建顶点着色器
    const vsSource = `
    precision mediump float;
         attribute vec4 a_Position;
         attribute vec4 inputTextureCoordinate;
          varying vec2 textureCoordinate;
         void main (){
           gl_Position = a_Position;
           textureCoordinate = vec2((a_Position.x+1.0)/2.0,1.0-(a_Position.y+1.0)/2.0);
         }
      `;
    //创建片元着色器
    const fsSource = `
         precision mediump float;
         varying vec2 textureCoordinate;
         uniform sampler2D inputImageTexture;
         uniform float size;
         uniform float saturation;
         uniform float r;
         uniform float g;
         uniform float b;
         uniform float a;
         void main(){
          vec4 texture = texture2D(inputImageTexture,textureCoordinate);
          texture.r+=r; //图片整体r值
          texture.g+=g;
          texture.b+=b;


          //饱和度
          float average = (texture.r+texture.g+texture.b)/3.0;
          if(saturation>0.0){
            texture.rbg +=(average-texture.rgb)*(1.0-1.0/(1.001-saturation));
          }else{
            texture.rgb+=(average-texture.rgb)*(-saturation);
          }
          gl_FragColor =texture;
         }
      `;

    // 初始化着色器
    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
      }
      console.log(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
    }

    //初始化对象
    function createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        webgl.useProgram(program);
        return program;
      }
      console.error(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
    }

    function createTextureByImageObject(gl, imgObject) {
      gl.activeTexture(gl.TEXTURE0);
      const textureObject = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, textureObject);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        imgObject
      );
      // 这告诉WebGL如果纹理需要被缩小时，采用线性插值的方式来进行采样
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // 这告诉WebGL如果纹理需要被方法时，采用线性插值的方式来进行采样
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      // 告诉WebGL如果纹理坐标超出了s坐标的最大/最小值，直接取边界值
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      // 告诉WebGL如果纹理坐标超出了t坐标的最大/最小值，直接取边界值
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return textureObject;
    }

    //点坐标
    const pointPos = [0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5];

    const vsShader = createShader(webgl, webgl.VERTEX_SHADER, vsSource),
      fsShader = createShader(webgl, webgl.FRAGMENT_SHADER, fsSource),
      program = createProgram(webgl, vsShader, fsShader),
      //创建缓冲区域
      buffer = webgl.createBuffer();

    webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
    webgl.bufferData(
      webgl.ARRAY_BUFFER,
      new Float32Array(pointPos),
      webgl.STATIC_DRAW
    );

    let a_Position = webgl.getAttribLocation(program, "a_Position");
    webgl.enableVertexAttribArray(a_Position);
    webgl.vertexAttribPointer(a_Position, 2, webgl.FLOAT, false, 0, 0);

    let img = new Image();
    //解决跨域
    img.crossOrigin = "anonymous";
    img.src =
      "https://cdn1.mihuiai.com/media/images/5ee5fd5a-f112-4b6b-b742-d58efeaa0775_thumb.png";
    img.onload = function () {
      createTextureByImageObject(webgl, img);
      // document.body.append(img);
      let saturationUniform = webgl.getUniformLocation(program, "saturation");
      let rUniform = webgl.getUniformLocation(program, "r");
      let gUniform = webgl.getUniformLocation(program, "g");
      let bUniform = webgl.getUniformLocation(program, "b");
      const uniform = webgl.getUniformLocation(program, "inputImageTexture");

      webgl.uniform1i(uniform, 0);
      webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);

      rangeS.addEventListener("input", function () {
        const val = Number(rangeS.value);
        webgl.uniform1f(saturationUniform, val);
        webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
      });

      rangeR.addEventListener("input", function () {
        const val = Number(rangeR.value);
        webgl.uniform1f(rUniform, val);
        webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
      });

      rangeG.addEventListener("input", function () {
        const val = Number(rangeG.value);
        webgl.uniform1f(gUniform, val);
        webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
      });

      rangeB.addEventListener("input", function () {
        const val = Number(rangeB.value);
        webgl.uniform1f(bUniform, val);
        webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
      });
    };
  });

  return (
    <div>
      <canvas
        id="webglCanvas"
        ref={webglCanvasRef}
        width="600px"
        height="600px"
      ></canvas>
      <div>
        饱和度{" "}
        <input
          type="range"
          id="S"
          min={-1}
          max={1}
          step={0.05}
          defaultValue={0}
        />
        Red
        <input
          type="range"
          id="R"
          min={-1}
          max={1}
          step={0.05}
          defaultValue={0}
        />
        Green
        <input
          type="range"
          id="G"
          min={-1}
          max={1}
          step={0.05}
          defaultValue={0}
        />
        Blue
        <input
          type="range"
          id="B"
          min={-1}
          max={1}
          step={0.05}
          defaultValue={0}
        />
      </div>
    </div>
  );
};

export default WebGLFilter;

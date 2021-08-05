import React, { useState } from "react";
// import logo from './logo.svg'
import "./App.css";

//HOOKS专辑
function App() {
  //声明一个叫“Count"的state变量
  const [count, setCount] = useState(0);
  //可以声明多个
  const [value ,setValue] = useState("")

  return (
    <div>
      <p>You clicked {count} times</p>
      <p>添加了{value} </p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={() => setValue(value + "起飞")}>芜湖！</button>
    </div>
  );
}

export default App;

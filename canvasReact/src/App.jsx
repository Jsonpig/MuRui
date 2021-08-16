import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import WebGLFilter from "./Component/WebGLCanvas";
import Home from "./Component/Home";
import "./App.less";
function App() {
  return (
    <div className = "Home">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Webglcav" component={WebGLFilter} />
        </Switch>

        <div className = "Choose">
          <Link to="/">Canvas画布</Link>
          <Link to="/Webglcav">WebGL画布</Link>
        </div>
      </Router>
    </div>
  );
}
export default App;

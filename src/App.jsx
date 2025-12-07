import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Demo from "./demo/demo";
import ScrollToHash from "./ScrollToHash";
import Project from "./project/project";

function App() {

  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Demo />} path="/demo" />
        <Route element={<Project />} path="/project" />
      </Routes>
    </Router>
  )
}

export default App;

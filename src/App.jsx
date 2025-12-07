import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Demo from "./demo/demo";
import ScrollToHash from "./ScrollToHash";

function App() {

  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Demo />} path="/demo" />
      </Routes>
    </Router>
  )
}

export default App;

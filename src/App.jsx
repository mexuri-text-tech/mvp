import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Demo from "./demo/demo";
import ScrollToHash from "./ScrollToHash";
import Project from "./project/project";
import About from "./pages/about/about";
import TermsPage from "./pages/terms/terms";
import ConversionAuditRequest from "./pages/calc/calc";
import Founder from "./pages/founder/founder";

function App() {

  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Demo />} path="/demo" />
        <Route element={<Project />} path="/project" />
        <Route element={<About />} path="/about" />
        <Route element={<TermsPage />} path="/terms-and-conditions" />
        <Route element={<ConversionAuditRequest />} path="/conversion-audit-request" />
        <Route element={<Founder />} path="/founder" />
      </Routes>
    </Router>
  )
}

export default App;

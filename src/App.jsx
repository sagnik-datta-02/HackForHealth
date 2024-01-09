import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import TherapyPage from "./Pages/TherapyPage";
import ScrollToTop from "./components/ScrollToTop";
export default function App() {
  return (
    
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route exact path="/" element={<LandingPage />}/>
          <Route exact path="/mental-health-test" element={<TherapyPage />} />
          
      </Routes>
    </BrowserRouter>
  );
}
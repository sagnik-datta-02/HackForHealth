import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import TherapyPage from "./Pages/TherapyPage";
import TheraPediaPage from "./Pages/TheraPediaPage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mental-health-test" element={<TherapyPage />} />
        <Route path="/therapedia" element={<TheraPediaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

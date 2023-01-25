import React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "./App.css";
import Invoice from "./Components/Invoice/Invoice";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* mui date picker */}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Router>
          <Routes>
            <Route path="/" element={<Invoice />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </div>
  );
}

export default App;

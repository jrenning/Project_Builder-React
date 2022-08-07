import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
import "./index.css"
import Javascript from './routes/Javascript';
import Python from './routes/python';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/python" element={<Python />} />
      <Route path="/javascript" element={<Javascript />} />
    </Routes>
  </BrowserRouter>
);

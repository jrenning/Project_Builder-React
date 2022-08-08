import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
import "./index.css"
import FileSettings from './routes/FileSettings';
import Javascript from './routes/Javascript';
import PathSettings from './routes/PathSettings';
import Python from './routes/Python';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/python" element={<Python />} />
      <Route path="/javascript" element={<Javascript />} />
      <Route path="/file_settings" element={<FileSettings />} />
      <Route path="/path_settings" element={<PathSettings />} />
    </Routes>
  </BrowserRouter>
);

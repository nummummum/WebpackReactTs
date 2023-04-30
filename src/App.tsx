import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SubPage1 from "./pages/SubPage1";
import SubPage2 from "./pages/SubPage2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />}></Route>
        <Route path="/subpage1" element={<SubPage1 />}></Route>
        <Route path="/subpage2" element={<SubPage2 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

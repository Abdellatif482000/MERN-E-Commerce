import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { HomePage } from "./homePage/homePage";
import { NavBar } from "./homePage/navbar";
import { Footer } from "./homePage/footer";

// import styles from "../cssModules/style.module.css";

import "./App.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

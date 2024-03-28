import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// if ("loading" in HTMLImageElement.prototype) {
//   const images = document.querySelectorAll('img[loading="lazy"]');
//   images.forEach((img) => {
//     img.src = img.dataset.src;
//   });
// } else {
//   // Dynamically import the LazySizes library
//   const script = document.createElement("script");
//   script.src =
//     "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.1.2/lazysizes.min.js";
//   document.body.appendChild(script);
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import MetaTags from 'react-meta-tags';
import Footer from "./components/Footer";

import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <MetaTags>
      <title>Calculator</title>
    </MetaTags>
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById("root")
);
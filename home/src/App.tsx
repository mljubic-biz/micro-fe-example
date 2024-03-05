import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import "./index.scss";
import Footer from "./Footer";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <Header />
    Home page content
    <Footer />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));

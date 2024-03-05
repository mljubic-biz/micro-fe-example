import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import SafeComponent from "./SafeComponent";
import Footer from "home/Footer";
import Header from "home/Header";

const App = () => {
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <SafeComponent>
        <Header />
      </SafeComponent>
      PDP Page Content
      <SafeComponent>
        <Footer />
      </SafeComponent>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));

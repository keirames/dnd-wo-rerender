import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import DragContainer from "./drag-view/drag-container";

function App() {
  return (
    <div className="p-6 text-center mx-80 bg-white rounded-xl shadow-lg">
      <DragContainer />
    </div>
  );
}

export default App;

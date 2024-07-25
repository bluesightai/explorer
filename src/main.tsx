import MapComponent from "./components/MapComponent.tsx"
import "./main.scss"
import React from "react"
import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <MapComponent />
    </div>
  </React.StrictMode>,
)

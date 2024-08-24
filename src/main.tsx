import MapComponent from "./components/MainMap/MapComponent.tsx"
import { AppProvider } from "./hooks/AppContext"
import "./main.scss"
import React from "react"
import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <div className="App" style={{ width: "100vw", height: "100vh" }}>
        <MapComponent />
      </div>
    </AppProvider>
  </React.StrictMode>,
)

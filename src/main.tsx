import MapApp from "./components/MainMap/MapApp"
import { AppProvider } from "./hooks/AppContext"
import "./main.scss"
import React from "react"
import ReactDOM from "react-dom/client"

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="App" style={{ width: "100vw", height: "100vh" }}>
        <MapApp />
      </div>
    </AppProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

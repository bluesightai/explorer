import MapApp from "./components/MainMap/MapApp"
import { AppProvider } from "./hooks/AppContext"
import "./main.scss"
// import React, { useEffect, useState } from "react"
import React from "react"
import ReactDOM from "react-dom/client"

// const DesktopOnlyApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth <= 768) // Adjust this breakpoint as needed
//     }

//     checkScreenSize()
//     window.addEventListener("resize", checkScreenSize)

//     return () => window.removeEventListener("resize", checkScreenSize)
//   }, [])

//   if (isMobile) {
//     return (
//       <div className="mobile-message-container">
//         <div className="mobile-message">
//           <h1 className="mobile-message-title">Desktop Only</h1>
//           <p className="mobile-message-text">
//             We're sorry, but this map application is only available on desktop devices.
//           </p>
//           <p className="mobile-message-text">Please visit us on a larger screen for the best experience.</p>
//         </div>
//       </div>
//     )
//   }

//   return <>{children}</>
// }

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

document.addEventListener("DOMContentLoaded", function () {
  if (/Android/i.test(navigator.userAgent)) {
    document.body.classList.add("android")
  }
})

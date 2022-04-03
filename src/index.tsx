import React from "react"
import {App} from "./App"
import {createRoot} from "react-dom/client";
import { ThemeProvider } from "./themes/ThemeProvider";

const container = document.getElementById("app")
const root = createRoot(container!)

root.render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
)

if (module.hot) {
  module.hot.accept()
}

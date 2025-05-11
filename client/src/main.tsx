import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Ensure Google fonts and Material icons are loaded
const linkFont = document.createElement("link");
linkFont.rel = "stylesheet";
linkFont.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
document.head.appendChild(linkFont);

const linkIcons = document.createElement("link");
linkIcons.rel = "stylesheet";
linkIcons.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
document.head.appendChild(linkIcons);

createRoot(document.getElementById("root")!).render(<App />);

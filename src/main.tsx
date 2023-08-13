import React, { StrictMode } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(<App />);

// const root = createRoot(document.getElementById('root') as HTMLElement);
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
// test
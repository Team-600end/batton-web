import React, { StrictMode } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App />
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
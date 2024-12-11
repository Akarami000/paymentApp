import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Import Tailwind CSS
import {Provider} from 'react-redux'; 
import store from './store/user/store.js'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>

);


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Import Tailwind CSS
import {Provider} from 'react-redux'; 
import {store,persistor} from './store/user/store.js'
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>

);


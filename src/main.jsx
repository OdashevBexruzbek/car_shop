// reactDOM imports
import ReactDOM from "react-dom/client";

// styles
import App from "./App.jsx";
import "./index.css";

// react redux
import { Provider } from "react-redux";

// store js
import { store } from "./app/store.js";

// react toast
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);

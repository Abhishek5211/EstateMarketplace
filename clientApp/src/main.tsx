import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import SignUp from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
import { persistor, store } from "./redux/store.ts";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

// const router = createBrowserRouter([{
//   path: "/",
//   element: <App />,
//   children: [{ path: "", element: <Home /> }, ],
// }]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
    <RouterProvider router={router} />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

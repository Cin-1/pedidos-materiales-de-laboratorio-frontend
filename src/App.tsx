import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

/* Components */
import Template from "./views/template";
import Login from "./views/login";

/* Styles */
import "./App.scss";
import PrivateRoute from "./components/private-route";
import RequestsView from "./views/requests";
import { AuthProvider } from "./context/auth.context";
import NotFound from "./views/errors/404";
import Register from "./views/register";

function App() {
  const [text, useText] = useState([]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route index path="/register/:token" element={<Register />} />

          <Route path="/requests" element={<RequestsView />} />
          {/**/}
          <Route element={<PrivateRoute />}>
            <Route element={<Template />}>
              <Route element={<Navigate replace to="/requests" />} index />
              <Route path="/requests" element={<RequestsView />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

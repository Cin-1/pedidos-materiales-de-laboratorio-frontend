import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

/* Components */
import Template from "./views/template";
import Login from "./views/login";

/* Styles */
import "./App.scss";
import PrivateRoute from "./components/private-route";
import { AuthProvider } from "./context/auth.context";
import NotFound from "./views/errors/404";
import Register from "./views/register";
import MaterialsView from "./views/Materials";
import RequestsView from "./views/requests";
import MaterialDetailsView from "./views/MaterialDetail";
import UserProfile from "./views/userProfile/UserProfile";

function App() {
  const [text, useText] = useState([]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route index path="/register/:token" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route element={<Template />}>
            <Route element={<Navigate replace to="/requests" />} index />
            <Route path="/requests" element={<RequestsView />} />
            <Route path="/materials" element={<MaterialsView />} />
            <Route path="/materials/:id" element={<MaterialDetailsView />} />
          </Route>

          {/**/}
          <Route element={<PrivateRoute />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

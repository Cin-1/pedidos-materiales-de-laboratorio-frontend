import React from "react";
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
import CardRequest from "./Components/card";
import Dropdown from "./Components/dropdown";

function App() {
  const mockData = {
    title: "Ejemplo de Título",
    icon: true,
    arrow: true,
    description: "Esta es una descripción de ejemplo.",
    stock: "10 unidades",
    repair: "2 unidades",
    clase: "Clase A",
  };
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route
            index
            path="/test"
            element={
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem", paddingTop: "2rem" }}>
                {/* <CardRequest
                  title="Pedido #1"
                  banner="Pendiente"
                  date="26/04/06"
                  laboratory="65"
                  building="Malvinas"
                  proffesor="Cin"
                  students="kamakdn"
                /> */}
                <Dropdown
                  title={mockData.title}
                  icon={mockData.icon}
                  desplegado={false}
                  description={mockData.description}
                  stock={mockData.stock}
                  repair={mockData.repair}
                  clase={mockData.clase}
                />{" "}
                <Dropdown
                  title={mockData.title}
                  icon={mockData.icon}
                  desplegado={false}
                  description={mockData.description}
                  stock={mockData.stock}
                  repair={mockData.repair}
                  clase={mockData.clase}
                />{" "}
                <Dropdown
                  title={mockData.title}
                  icon={mockData.icon}
                  desplegado={true}
                  description={mockData.description}
                  stock={mockData.stock}
                  repair={mockData.repair}
                  clase={mockData.clase}
                />{" "}
                <Dropdown
                  title={mockData.title}
                  icon={mockData.icon}
                  desplegado={true}
                  description={mockData.description}
                  stock={mockData.stock}
                  repair={mockData.repair}
                  clase={mockData.clase}
                />{" "}
              </div>
            }
          />

          {/* Component PrivateRoute will check for a valid JWT
           * and redirect to '/login' if there isn't one
           * so every route that requires an auth user should be
           * defined inside this route*/}
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

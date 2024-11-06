import React, { FormEvent, ReactElement, useState } from "react";
import { useRegister } from "../../services/auth.service";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { validateForm } from "./valideForm";
import handlePromise from "../../utils/promise";

export default function Register(): ReactElement {
  const { register } = useRegister();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const onRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = {
      nombre: (e.target as any).nombre.value,
      apellido: (e.target as any).apellido.value,
      dni: (e.target as any).dni.value,
      email: (e.target as any).email.value,
      password: (e.target as any).password.value,
      confirmPassword: (e.target as any).confirmPassword.value,
    };
    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    const [, err] = await handlePromise<void, string>(register(formData, token));
    if (err) return setError(err);
    navigate("/login");
  };

  return (
    <div className="container containerStyle">
      <div className="banner bannerStyle">
        <img src="/img/logo-universidad.png" alt="UNAHUR" className="logoUniStyle" />
      </div>
      <form onSubmit={onRegister} className="formEndStyle">
        <TextField
          className="textFieldStyle"
          variant="standard"
          placeholder="Nombre"
          type="text"
          name="nombre"
          autoComplete="off"
        />
        <TextField
          className="textFieldStyle"
          variant="standard"
          placeholder="Apellido"
          type="text"
          name="apellido"
          autoComplete="off"
        />
        <TextField
          className="textFieldStyle"
          variant="standard"
          placeholder="Email"
          type="text"
          name="email"
          autoComplete="off"
        />
        <TextField
          className="textFieldStyle"
          variant="standard"
          placeholder="Dni"
          type="text"
          name="dni"
          autoComplete="off"
        />
        <TextField className="textFieldStyle" variant="standard" type="text" placeholder="Contraseña" name="password" />
        <TextField
          className="textFieldStyle"
          variant="standard"
          type="text"
          placeholder="Confirmar contraseña"
          name="confirmPassword"
        />

        <Button type="submit" className="buttonStyle">
          Registrarse
        </Button>
        {error && <small>{error}</small>}
      </form>
    </div>
  );
}

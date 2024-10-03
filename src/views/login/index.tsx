import React, { FormEvent, ReactElement, useState } from "react";
import handlePromise from "../../utils/promise";
import useAuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

export default function Login(): ReactElement {
  const { login } = useAuthService();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;
    const [, err] = await handlePromise<void, string>(login(email, password));
    if (err) return setError(err);
    navigate("/requests");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const logoUniStyle = {
    textAlign: "center",
  };

  const imageStyle = {
    position: "absolute",
    marginTop: "70px",
    zIndex: "10",
  };

  const formEndStyle = {
    backgroundColor: "white",
    height: "60%",
    width: "90vw",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: "8%",
    borderTopRightRadius: "8%",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
  };

  const bannerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#2b76ff",
    width: "100vw",
    height: "50%",
    marginBottom: "-25px",
  };

  const textFieldStyle = {
    width: "90vw",
    marginTop: "40px",
  };

  const buttonStyle = {
    borderRadius: "8px",
    textTransform: "none",
    backgroundColor: "#2b76ff",
    padding: "12px",
    color: "white",
    width: "90vw",
    marginTop: "20px",
  };

  const emailInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <EmailIcon />
      </InputAdornment>
    ),
  };

  const passwordInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <LockIcon />
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleTogglePasswordVisibility} onMouseDown={(e) => e.preventDefault()}>
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <div className="container" style={containerStyle}>
      <div className="banner" style={bannerStyle}>
        <img src="/image/logo-universidad.png" alt="UNAHUR" style={logoUniStyle} />
        <img src="/image/scientist.png" alt="Cientifico de laboratorio" style={imageStyle} />
      </div>
      <form onSubmit={onLogin} style={formEndStyle}>
        <TextField
          style={textFieldStyle}
          variant="standard"
          placeholder="Email"
          type="text"
          name="email"
          InputProps={emailInputProps}
        />
        <TextField
          style={textFieldStyle}
          variant="standard"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          name="password"
          InputProps={passwordInputProps}
        />
        <Button type="submit" style={buttonStyle}>
          Iniciar Sesión
        </Button>
        {error && <small>{error}</small>}
      </form>
    </div>
  );
}

import React, { MouseEvent, ReactElement } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowBack, ThreeDRotationRounded } from "@mui/icons-material";
import Search from "../search";
import "./styles.scss";
import { IconButton } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAuth } from "../../context/auth.context";
import Swal from "sweetalert2";

export type HeaderProps = {
  title: string;
  enableSearch: boolean;
  children?: any;
  icon?: string | undefined;
  backArrow?: boolean | undefined;
  searchPlaceholder?: string | undefined;
  searchCallback?: (input: string) => void;
};

const handleLogout = () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Estás a punto de cerrar sesión.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      authService.logout();
      console.log("Sesión cerrada");
      Swal.fire("¡Cerraste sesión!", "Tu sesión ha sido cerrada correctamente.", "success");
    }
  });
};

export default function Header({
  title,
  enableSearch,
  searchPlaceholder,
  searchCallback,
  children,
  icon,
  backArrow,
}: HeaderProps): ReactElement {
  const navigate = useNavigate();
  const authService = useAuth();

  const onBackClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <header style={{ display: "flex", justifyContent: "space-between", maxWidth: "100%" }}>
      <div>
        <h1>
          {backArrow && (
            <Link onClick={onBackClick} to={""} style={{ fontSize: "calc(14px + 1vw)", marginRight: "0.5em" }}>
              <ArrowBack />
            </Link>
          )}
          {icon && !backArrow && <img src={`img/header/${icon}`}></img>}
          {title}
        </h1>
        <span>{children}</span>
        {enableSearch && searchCallback && searchPlaceholder && (
          <Search placeholder={searchPlaceholder} callback={searchCallback} />
        )}
      </div>

      <IconButton
        aria-label="boton-loguot"
        onClick={() => {
          handleLogout();
        }}
      >
        <LogoutOutlinedIcon className="boton-loguot" style={{ fontSize: "calc(14px + 1vw)" }} />
      </IconButton>
    </header>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { CancelOutlined, EditOutlined } from "@mui/icons-material";
import useUserService from "../../services/user.service";
import handlePromise from "../../utils/promise";
import { useAuth } from "../../context/auth.context";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

export default function ProfileCard() {
  const userService = useUserService();
  const authService = useAuth();

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [NombreError, setNombreError] = React.useState(false);
  const [NombreErrorMessage, setNombreErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [editProfile, setEditProfile] = React.useState(false);
  const [userData, setUserData] = React.useState({ nombre: "", apellido: "", email: "", dni: 0 });

  React.useEffect(() => {
    const fetchMaterials = async () => {
      try {
        //ver como traer esto
        const [userData, err] = await handlePromise(userService.getUser("id"));

        if (err) {
          throw err;
        }
        if (userData) {
          setUserData({
            nombre: userData.name || "",
            apellido: userData.lastName || "",
            email: userData.email || "",
            dni: userData.dni || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMaterials();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = () => {
    setEditProfile(!editProfile);
  };

  const handleCloseSession = () => {
    authService.logout();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || NombreError) {
      event.preventDefault();
      return;
    }
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      Nombre: data.get("Nombre"),
      apellido: data.get("apellido"),
    });
  };

  const validateInputs = () => {
    const isValid = true;
    return isValid;
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
          Mi perfil
        </Typography>
        <Button
          onClick={() => {
            handleEdit();
          }}
        >
          {editProfile ? <CancelOutlined fontSize="medium" /> : <EditOutlined fontSize="medium" />}
        </Button>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2, backgroundColor: "transparent" }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            disabled
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="your@email.com"
            placeholder={userData.email}
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="Nombre">Nombre</FormLabel>
          </Box>
          <TextField
            disabled={!editProfile}
            error={NombreError}
            helperText={NombreErrorMessage}
            name="Nombre"
            placeholder={userData.nombre}
            type="Nombre"
            id="Nombre"
            autoComplete="current-Nombre"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={NombreError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="Nombre">Apellido</FormLabel>
          </Box>
          <TextField
            disabled={!editProfile}
            error={NombreError}
            helperText={NombreErrorMessage}
            name="Apellido"
            placeholder={userData.apellido}
            type="Nombre"
            id="Nombre"
            autoComplete="current-Nombre"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={NombreError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="Nombre">Dni</FormLabel>
          </Box>
          <TextField
            disabled={!editProfile}
            error={NombreError}
            helperText={NombreErrorMessage}
            name="Dni"
            placeholder={userData.dni.toString()}
            type="Dni"
            id="Dni"
            autoComplete="current-Dni"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={NombreError ? "error" : "primary"}
          />
        </FormControl>

        <ForgotPassword open={open} handleClose={handleClose} />
        {editProfile && (
          <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
            Actualizar perfil
          </Button>
        )}
      </Box>
      <Divider></Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Link component="button" type="button" onClick={handleClickOpen} variant="body2" sx={{ alignSelf: "center" }}>
          ¿Olvidaste tu contraseña?
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Link
          component="button"
          type="button"
          onClick={handleCloseSession()}
          variant="body2"
          sx={{ alignSelf: "center" }}
        >
          Cerrar sesión
        </Link>
      </Box>
    </Card>
  );
}

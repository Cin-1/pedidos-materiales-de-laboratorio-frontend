import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { Button } from "@mui/material";
import GenerateLink from "./generateRegister";

const items = [
  {
    icon: <PersonAddAltIcon sx={{ color: "text.secondary" }} />,
    title: "Generar link de registración",
    description: "Nuevo  usuario",
    modalTitle: "Generar registro para usuario",
    content: "Ingresa la dirección de correo electrónico del nuevo usuario.",
  },
  {
    icon: <ManageAccountsIcon sx={{ color: "text.secondary" }} />,
    title: "Definir rol para usuario",
    description: "Asignar rol",
    modalTitle: "Elegir rol para usuario",
    content: "Seleccionar el rol para el usuario",
  },
  {
    icon: <PersonOffIcon sx={{ color: "text.secondary" }} />,
    title: "Eliminar un usuario",
    description: "Borrar usuario",
    modalTitle: "Eliminar usuario",
    content: "Ingresa la dirección de correo electrónico del usuario a eliminar.",
  },
];

export default function AdminPanel() {
  const [open, setOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({ title: "", content: "" });

  const handleClickOpen = (title: string, content: string) => {
    setModalContent({ title, content });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack sx={{ flexDirection: "column", gap: 4, maxWidth: 580 }}>
      <Box sx={{ display: { xs: "none", md: "flex" } }}></Box>
      <Typography variant="h5" component="h2">
        Panel del administrador
      </Typography>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: "medium" }}>
              {item.title}
            </Typography>
            <Button variant="contained" onClick={() => handleClickOpen(item.modalTitle, item.content)}>
              {item.description}
            </Button>
          </div>
        </Stack>
      ))}
      <GenerateLink open={open} handleClose={handleClose} title={modalContent.title} content={modalContent.content} />
    </Stack>
  );
}

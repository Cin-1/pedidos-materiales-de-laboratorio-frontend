import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import FormError from "../../Mensajes/FormError";
import { formValidate } from "../../../utils/formValidator";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "descripcion", headerName: "Descripción", width: 450 },
  { field: "clase", headerName: "Clase", width: 150 },
  { field: "cantidad", headerName: "Cantidad", width: 150 },
];

const StepMateriales = (props) => {
  const {
    register,
    errors,
    setValue,
    setError,
    listaMateriales,
    valueHoraFin,
    clearErrors,
    handleNext,
    handleBack,
    setListaMateriales,
    getValues,
  } = props.values;
  const { validateStock } = formValidate();
  const [material, setMaterial] = useState({});
  const [list, setLista] = useState(getValues("lista_materiales") || []);
  const [selectedRows, setSelectedRows] = useState({});
  const [saveHistoric, setSaveHistoric] = useState({});
  const stock = () => {
    const fecha_inicio = getValues("fecha_utilizacion");
    const fecha_fin = valueHoraFin;
    const find = listaMateriales.find((e) => e._id == material.material);
    if (find) {
      // Calcular el stock disponible teniendo en cuenta las reservas
      const reservas = find.enUso || [];
      // Filtrar las reservas que se superponen con la fecha de interés
      const reservasEnFecha = reservas.filter((reserva) => {
        return (
          (fecha_inicio >= reserva.fecha_inicio &&
            fecha_inicio <= reserva.fecha_fin) ||
          (fecha_fin >= reserva.fecha_inicio &&
            fecha_fin <= reserva.fecha_fin) ||
          (fecha_inicio <= reserva.fecha_inicio &&
            fecha_fin >= reserva.fecha_fin)
        );
      });
      // Sumar la cantidad de todas las reservas que se superponen
      const cantidadEnFecha = reservasEnFecha.reduce(
        (total, reserva) => total + reserva.cantidad,
        0
      );
      const stockTotal = find.stock - cantidadEnFecha;
      const stockDisponible = stockTotal - (find.enReparacion || 0);

      return stockDisponible;
    }
  };
  const handleMaterial = (e) => {
    if (stock() < getValues("cant_material")) {
      setError("cant_material", {
        type: "manual",
        message: "No puede superar el Stock",
      });
    } else {
      clearErrors("cant_material");
    }
    if (errors.cant_material == undefined) {
      const fecha_inicio = getValues("fecha_utilizacion");
      const fecha_fin = valueHoraFin;
      let array = [...getValues("lista_materiales")];
      let listaGeneral = [...listaMateriales];
      let listaMap = [...list];
      let index = array.findIndex((e) => e.material == material.material);
      let indexGeneral = listaMateriales.findIndex((e) => e._id == material.material);
      let indexMap = listaMap.findIndex((e) => e._id == material.material);
      let find = listaMateriales.find((e) => e._id == material.material);

      // Verificar superposición con las reservas existentes
      let overlappingReservation =
        find.enUso.lenght > 0 &&
        find.enUso.find((reserva) => {
          return (
            (fecha_inicio >= reserva.fecha_inicio &&
              fecha_inicio <= reserva.fecha_fin) ||
            (fecha_fin >= reserva.fecha_inicio &&
              fecha_fin <= reserva.fecha_fin) ||
            (fecha_inicio <= reserva.fecha_inicio &&
              fecha_fin >= reserva.fecha_fin)
          );
        });
      let indexFind = find.enUso.findIndex((reserva) => {
        return (
          (fecha_inicio >= reserva.fecha_inicio &&
            fecha_inicio <= reserva.fecha_fin) ||
          (fecha_fin >= reserva.fecha_inicio &&
            fecha_fin <= reserva.fecha_fin) ||
          (fecha_inicio <= reserva.fecha_inicio &&
            fecha_fin >= reserva.fecha_fin)
        );
      });

      if (overlappingReservation) {
        setSaveHistoric((old) => ({
          ...old,
          [find._id]: {index: indexFind, reservation: overlappingReservation},
        }));
        // Actualizar la cantidad disponible en la franja horaria superpuesta
        overlappingReservation.cantidad += material.cantidad || 0;

        // Ajustar las franjas horarias comprometidas
        overlappingReservation.fecha_inicio = Math.min(
          overlappingReservation.fecha_inicio,
          fecha_inicio
        );
        overlappingReservation.fecha_fin = Math.max(
          overlappingReservation.fecha_fin,
          fecha_fin
        );
      } else {
        // No hay superposición, agregar una nueva reserva
        find.enUso.push({
          fecha_inicio,
          fecha_fin,
          cantidad: material.cantidad || 0,
        });
      }

      listaGeneral[indexGeneral] = overlappingReservation
        ? overlappingReservation
        : find;
      find.id = material.material;
      find.cantidad = material.cantidad || find.cantidad;

      let obj = { material: material.material, cant_material: material.cantidad || 0 };
      index >= 0 ? (array[index] = obj) : array.push(obj);
      indexMap >= 0 ? (listaMap[indexMap] = find) : listaMap.push(find);

      setLista(listaMap);
      setValue("lista_materiales", array);
      setListaMateriales(listaGeneral);

      setMaterial({});
      setValue("id_equipo", null);
      setValue("cant_material", null);
    }
  };
  const handleDeleteSelected = () => {
    let array = [...getValues("lista_materiales")];
    let listaGeneral = [...listaMateriales];
    let listaMap = [...list];
    array = array.filter((e) => !selectedRows.hasOwnProperty(e.material));
    // setSaveHistoric((old) => ({
    //   ...old,
    //   [find._id]: {index: indexFind, reservation: overlappingReservation},
    // }));
    listaGeneral = listaGeneral.map((e) => {
      if (selectedRows.hasOwnProperty(e._id)) {
        let find = saveHistoric[e._id]
        e.enUso[find.index] = find.reservation;
      }
      return e;
    });
    listaMap = listaMap.filter((e) => !selectedRows.hasOwnProperty(e._id));
    setLista(listaMap);
    setValue("lista_materiales", array);
    setListaMateriales(listaGeneral);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          my: "2vh !important",
        }}
        autoComplete="off"
      >        
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="Equipo">Material</InputLabel>
            <Select
              labelId="Equipo"
              id="Equipo"
              value={material.material}
              
              label="Equipo"
              {...register("id_material")}
              onChange={(e) => {
                setValue("id_material", e.target.value);
                setMaterial((old) => ({ ...old, material: e.target.value }));
                clearErrors("cant_material");
              }}
            >
              {listaMateriales.map((item, index) => (
                <MenuItem sx={{
                  '&.MuiButtonBase-root' :
                  {
                    display: "block !important", // Agregar estilos flex aquí
                  },
                }} key={index} value={item._id}>
                  {item.descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {(stock() !== undefined || stock() > 0) && (
          <>
            <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                {stock() != 0 && (
                  <TextField
                    sx={{ ml: "8px", width: "20vw" }}
                    id="outlined-basic"
                    name="cant_material"
                    error={!!errors.cant_material}
                    label="Cantidad"
                    variant="outlined"
                    {...register("cant_material", {
                      required: {
                        value: stock() != 0 && getValues("id_material") && true,
                        message: "Debe ingresar una Cantidad",
                      },
                      validate: validateStock(stock()),
                      onChange: (e) => {
                        setMaterial((old) => ({
                          ...old,
                          cantidad: parseInt(e.target.value),
                        }));
                      },
                    })}
                  />
                )}

                {
                  <Box
                    sx={{
                      color: "#1B621A",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {stock() != 0 ? `${stock()} en Stock` : "Consultar Stock"}
                  </Box>
                }
              </ButtonGroup>
              <FormError error={errors.cant_material} />
            </Box>
            <IconButton
              sx={{ maxHeight: "8vh", width: "6vw" }}
              aria-label="delete"
              size="small"
              onClick={handleMaterial}
            >
              <AddCircleIcon color="success" />
            </IconButton>
          </>
        )}
      </Box>
      <Divider />
      <Box sx={{ maxHeight: "40vh" }}>
        {list.length > 0 && (
          <div style={{ height: "30vh", width: "100%" }}>
            <DataGrid
              rows={list}
              columns={columns}
              sx={{
                "& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar .MuiTablePagination-actions":
                  {
                    display: "flex", // Agregar estilos flex aquí
                  },
              }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 4 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onStateChange={(value) => {
                setSelectedRows(value.rows.dataRowIdToModelLookup);
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteSelected}
              disabled={selectedRows.length === 0}
            >
              Eliminar seleccionados
            </Button>
          </div>
        )}
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            position: "fixed",
            bottom: "30px",
            left: "30px",
            pt: 2,
          }}
        >
          <Box sx={{ flex: "1 1 auto" }} />
          <Button
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Volver
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            position: "fixed",
            bottom: "30px",
            right: "30px",
            pt: 2,
          }}
        >
          <Box sx={{ flex: "1 1 auto" }} />
          <Button
            onClick={() => {
              Object.keys(errors).length == 0 && handleNext();
            }}
            sx={{ mr: 1 }}
          >
            Siguiente
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default StepMateriales;

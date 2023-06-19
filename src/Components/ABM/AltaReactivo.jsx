import React, { useState } from "react";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import SendIcon from '@mui/icons-material/Send';
import TableContainer from '@mui/material/TableContainer';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import laboratorio from '../Image/biologia.png';
import { Autocomplete, TextField, ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';
import Theme1 from '../Theme/Theme1';
import postEquipo from "../../Services/postEquipo";
import { useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

function AltaReactivo(
    { open = { open },
        setOpen = { setOpen },
        scroll = { scroll },
        handleClose = { handleClose },


    }
) {
    const [error,setError]=useState("none")
    const cargaEquipo = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('clase'));
        console.log(data.get('descripcion'));
        console.log(data.get('stock'));

        if (data.get('clase') != "" &&  data.get('descripcion') != "" && data.get('stock') != "") {
            setError("none")
       
        const dato = {
            "clase": data.get('clase'),
            "descripcion": (data.get('descripcion').toUpperCase()),
            "stock": parseInt(data.get('stock')),
            "unidadMedida": "UNI"
        }
       
        postEquipo(dato)
        setError("none")
        setOpen(false);
    }
        else { setError("block")}


    };


    return (

        <ThemeProvider theme={Theme1}>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                sx={{padding: 2, height: 500}}

            >
                
                <DialogContent
                    dividers={scroll === 'paper'
                    }
                    sx={{
                        '--Grid-borderWidth': '1px', borderTop: 'var(--Grid-borderWidth) solid',
                        borderLeft: 'var(--Grid-borderWidth) solid',
                        borderRight: 'var(--Grid-borderWidth) solid',
                        borderBottom: 'var(--Grid-borderWidth) solid',
                        borderColor: 'divider', padding: 2, borderRadius: 4, margin: 3

                    }}

                >


                    <Grid container direction='row' component="form" onSubmit={cargaEquipo}
                        sx={{ marginTop: 1 }} columns={{ xs: 12 }} >

                        <Grid container
                            noValidate direction="row"
                            justifyContent="start"
                            alignItems="start"
                            spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >

                            <Grid item xs={1} container justifyContent="center"  >
                                <img width={30} alt="" heigth={30} src={laboratorio} />
                            </Grid>
                            <Grid item xs={4} container justifyContent="start">
                                <Typography sx={{ fontSize: 30 }} color="text.secondary">
                                    Equipo
                                </Typography>
                            </Grid>
                            <Grid item xs={6}  display={error} container justifyContent="start">
                                <Typography sx={{ fontSize: 20 }} color="error">
                                    FALTAN CARGAR DATOS
                                </Typography>
                            </Grid>
                        </Grid>


                        <Grid container
                            noValidate direction="row"
                            justifyContent="start"
                            alignItems="start" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >

                            <Grid item xs={10} alignItems="center" justifyContent="start">
                                <TextField
                                    sx={{ marginTop: 1, marginBottom: 1, marginLeft: 0 }}
                                    fullWidth
                                    id="descripcion"
                                    label="Descripcion"
                                    name="descripcion"
                                    InputLabelProps={{ shrink: true }}
                                    // autoComplete="descripcion"
                                    autoFocus
                                />

                            </Grid>

                            <Grid container
                                noValidate direction="row"
                                justifyContent="start"
                                alignItems="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >

                                <Grid item xs={8} container justifyContent="center" marginTop={1} marginLeft={1}>
                                    <FormControl fullWidth>
                                        <InputLabel id="clase"> Clase </InputLabel>
                                        <Select
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            labelId="clase"
                                            id="clase"
                                            label="clase"
                                            name="clase"
                                            defaultValue={" "}
                                        >

                                            <MenuItem sx={{ fontSize: 12 }} value={" "}> </MenuItem>
                                            <MenuItem sx={{ fontSize: 12 }} value={"AGITADORES-CENTRIFUGAS"}>AGITADORES Y CENTRIFUGAS</MenuItem>
                                            <MenuItem sx={{ fontSize: 12 }} value={"BAÑOS"}>BAÑOS</MenuItem>
                                            <MenuItem sx={{ fontSize: 12 }} value={"EQUIPO-GENERAL"}>EQUIPO GENERAL</MenuItem>
                                            <MenuItem sx={{ fontSize: 12 }} value={"EQUIPO-PCR"}>EQUIPO PARA PCR</MenuItem>
                                            <MenuItem sx={{ fontSize: 12 }} value={"ESTERILIZACION"}>ESTERILIZACION</MenuItem>
                                            <MenuItem sx={{ fontSize: 12 }} value={"ESTUFAS,INCUBADORAS Y MUFLAS"}>ESTUFAS,INCUBADORAS Y MUFLAS</MenuItem>
                                            <MenuItem sx={{ fontSize: 12 }} value={"MEDIDORES-SONDAS-PHMTS"}>MEDIDORES,SONDAS Y PHmetros</MenuItem>
                                            <MenuItem sx={{ fontSize: 12 }} value={"OPTICA"}>OPTICA</MenuItem>
                                            <MenuItem sx={{ fontSize: 12 }} value={"QUIMICA-ANALITICA"}>QUÍMICA ANALÍTICA</MenuItem>
                                            <MenuItem sx={{ fontSize: 12 }} value={"SALIDA-CAMPO-ANALISIS-AGUA"}>SALIDA DE CAMPO Y ANÁLISIS DE AGUA</MenuItem>
                                            <MenuItem sx={{ fontSize: 12 }} value={"SISTEMAS-MEDICION"}>SISTEMAS DE MEDICION</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Grid>

                                <Grid item xs={3} container justifyContent="center" >

                                    <TextField
                                        sx={{ marginTop: 1 }}

                                        id="stock"
                                        variant="outlined"
                                        name="stock"
                                        label="stock"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                max: 100, min: 0
                                            }
                                        }}

                                    />
                                </Grid>
                            </Grid>

                        </Grid>
     

                        <Grid container direction="row"
                            justifyContent="space-around"
                            columns={{ xs: 12 }} >

                            <Grid item xs={4}
                                height={50}
                                bgcolor={"error"}
                                borderRadius={2}
                                sx={{ mt: 3, mb: 2 }}

                            >
                                <Button fullWidth


                                    margin="normal"
                                    variant="contained"
                                    color="error"
                                    startIcon={<ReplyAllIcon />}
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                    style={{ borderRadius: 8 }}
                                    styled={{ textTransform: 'none' }}
                                    sx={{ height: 50 }}
                                >  CANCELAR</Button>

                            </Grid>

                            <Grid item xs={4} height={50}
                                bgcolor={"primary.main"} borderRadius={2}
                                sx={{ mt: 3, mb: 2 }}
                            >

                                <Button
                                    fullWidth
                                    style={{ height: 50, borderRadius: 8 }}
                                    margin="normal"
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                    color="primary"
                                    borderRadius={4}
                                    type="submit"

                                >
                                    ALTA</Button>

                            </Grid>
                        </Grid>





                    </Grid>

                 



                </DialogContent>
            </Dialog>



        </ThemeProvider >


    );

}

export default AltaReactivo;
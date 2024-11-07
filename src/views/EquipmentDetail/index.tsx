import React, { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import MobileNav from "../../components/mobile-nav";
import useEquipmentService from "../../services/equipment.service";
import handlePromise from "../../utils/promise";
import { Equipment } from "../../types/equipment";
import TextField from "@mui/material/TextField";
import { Button, Fab } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Delete, Save } from "@mui/icons-material";

export default function EquipmentDetailView(): ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipmentData, setEquipmentData] = useState<Equipment>();
  const equipmentService = useEquipmentService();

  const [description, setDescription] = useState("");
  const [Stock, setStock] = useState();

  const [type, setType] = useState("");
  const [Repair, setRepair] = useState(0);

  useEffect(() => {
    const fetchEquipments = async () => {
      if (id) {
        try {
          const [equipment, err] = await handlePromise(equipmentService.getEquipment(id));
          if (err) {
            throw err;
          }
          if (equipment) {
            setDescription(equipment.description);
           //setStock((equipment.stock));
            setType(equipment.type);
            setRepair(equipment.inRepair ? equipment.inRepair : 0);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchEquipments();
  }, []);

  
  const headerAttributes = {
    title: "Equipo",
    enableSearch: false,
    backArrow: true,
    icon: "equipment.svg",
    searchPlaceholder: "Buscar Equipo",
  };

 const onDelete = async(): Promise<void> =>
     {
        if (id) {
          const [, err] = await handlePromise<void, string>(equipmentService.removeEquipment(id), );
          if (err) return console.log(err);
          navigate(-1);
      }
     }

  const onsubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = {
      description: description,
      Stock: Stock,
      type:type,
      Repair: Repair
    };

    /*     const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }
 */
    if (equipmentData && id) {
   /*    const [, err] = await handlePromise<void, string>(
        equipmentService.updateEquipment(id, {
              description: description,
              stock: Stock,
              type:type,
              Repair: Repair
        }),
      );
      if (err) return console.log(err);
      navigate(-1);
    } else {
      const [, err] = await handlePromise<void, string>(
        equipmentService.addEquipment({
                description: description,
                stock: Stock,
                type:type,
                Repair: Repair
        }),
      );
      if (err) return console.log(err);
      navigate(-1); */
    }
  };

  return (
    <>
      <Header {...headerAttributes}></Header>

      <main>
        <div className="body">
          <form onSubmit={onsubmit} className="formEndStyle">
            <TextField
              id="description"
              className="formElement"
              multiline
              value={description}
              rows={4}
              label="description"
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
            />

        

            <FormControl className="formElement">
              <InputLabel id="demo-simple-select-label">Stock</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Stock}
                label="Stock"
                onChange={(e) => {}}
              >
                <MenuItem value={"s"}>Suficiente</MenuItem>
                <MenuItem value={"f"}>faltante</MenuItem>
                
              </Select>
            </FormControl>

            <FormControl className="formElement">
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="unidad de Medida"
                onChange={(e) => setType(e.target.value as string)}
              >
                <MenuItem value={"Tubos de ensayo"}>Tubos de ensayo</MenuItem>
                <MenuItem value={"equipo general"}>Tubos de ensayo</MenuItem>
              </Select>
            </FormControl>

            <TextField id="En Reparacion" className="formElement" label="En Reparacion" variant="outlined" />
            <div className="buttons">
              <Button type="submit" variant="contained">
                Grabar
              </Button>
            </div>
            <div className="fbuttons">
              <div style={{ marginRight: "1rem" }}>
                <Fab color="success" aria-label="save" type="submit"  >
                  <Save />
                </Fab>
              </div>
              {id!="New"? 
              <Fab color="error" aria-label="borrar" onClick={(e) => {onDelete()}}>
                <Delete />
              </Fab>:
              <div/>}
              
            </div>
          </form>
        </div>
      </main>
      <MobileNav />
    </>
  );
}

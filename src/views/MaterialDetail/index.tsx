import React, { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import MobileNav from "../../components/mobile-nav";
import useMaterialService from "../../services/material.service";
import handlePromise from "../../utils/promise";
import { Material } from "../../types/material";
import TextField from "@mui/material/TextField";
import { Button, Fab } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Delete, Save } from "@mui/icons-material";

export default function MaterialDetailView(): ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();
  const [materialData, setMaterialData] = useState<Material>();
  const materialService = useMaterialService();

  const [description, setDescription] = useState("");
  const [unit, setunit] = useState("");
  const [type, settype] = useState("");
  const [Stock, setStock] = useState(0);
  const [Repair, setRepair] = useState(0);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (id) {
        try {
          const [material, err] = await handlePromise(materialService.getMaterial(id));
          if (err) {
            throw err;
          }
          if (material) {
            setDescription(material.description);
            setunit(material.unitMeasure);
            settype(material.type);
            setStock(material.stock);
            setRepair(material.inRepair ? material.inRepair : 0);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchMaterials();
  }, []);

  const onSearchResult = (input: string) => {
    //input ? setShowedMaterial(materialData.filter( m => m.description.toLowerCase().includes(input.toLowerCase()))):  setShowedMaterial(materialData);
    console.log("asd");
  };

  const headerAttributes = {
    title: "materiales",
    enableSearch: false,
    backArrow: true,
    icon: "material.svg",
    searchPlaceholder: "Buscar Material",
    searchCallback: onSearchResult,
  };

  const onsubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = {
      description: description,
      unit: unit,
      type: type,
      Stock: Stock,
      Repair: Repair,
    };

    /*     const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }
 */
    if (materialData && id) {
      const [, err] = await handlePromise<void, string>(
        materialService.updateMaterial(id, {
          description: description,
          unitMeasure: unit,
          type: type,
          stock: Stock,
          inRepair: Repair,
        }),
      );
      if (err) return console.log(err);
      navigate(-1);
    } else {
      const [, err] = await handlePromise<void, string>(
        materialService.addMaterial({
          description: description,
          unitMeasure: unit,
          type: type,
          stock: Stock,
          inRepair: Repair,
        }),
      );
      if (err) return console.log(err);
      navigate(-1);
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

            {/*     <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Stock</InputLabel>
              <Select 
                className="description"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={materialData? materialData.stock : ''}
                label="Stock"
                onChange={handleChange}
              >
                <MenuItem value={'Suficiente'}>Suficiente</MenuItem>
                <MenuItem value={'faltante'}>faltante</MenuItem>
              </Select>
            </FormControl> */}

            <FormControl className="formElement">
              <InputLabel id="demo-simple-select-label">Unidad/medida</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={unit}
                label="unidad de Medida"
                onChange={(e) => setunit(e.target.value as string)}
              >
                <MenuItem value={"u"}>Unidades</MenuItem>
                <MenuItem value={"d"}>Docenas</MenuItem>
                <MenuItem value={"cm"}>centimetros Cubicos</MenuItem>
                <MenuItem value={"ml"}>miliLitros</MenuItem>
                <MenuItem value={"mg"}>miliGramos</MenuItem>
                <MenuItem value={"Copas mundiales"}>Copas mundiales</MenuItem>
                <MenuItem value={"Dedos de Frente"}>Dedos de Frente</MenuItem>
              </Select>
            </FormControl>

            <FormControl className="formElement">
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="unidad de Medida"
                onChange={(e) => settype(e.target.value as string)}
              >
                <MenuItem value={"Tubos de ensayo"}>Tubos de ensayo</MenuItem>
                <MenuItem value={"Goteros"}>Goteros</MenuItem>
                <MenuItem value={"Frascos"}>Frascos</MenuItem>
                <MenuItem value={"Bureta"}>Bureta</MenuItem>
                <MenuItem value={"Pipeta"}>Pipeta</MenuItem>
              </Select>
            </FormControl>

            <TextField id="Stock" className="formElement" label="Stock" variant="outlined" />
            <TextField id="En Reparacion" className="formElement" label="En Reparacion" variant="outlined" />
            <div className="buttons">
              <Button type="submit" variant="contained">
                Grabar
              </Button>
            </div>
            <div className="fbuttons">
              <div style={{ marginRight: "1rem" }}>
                <Fab color="success" aria-label="save" onClick={() => {}}>
                  <Save />
                </Fab>
              </div>
              <Fab color="error" aria-label="borrar" onClick={() => {}}>
                <Delete />
              </Fab>
            </div>
          </form>
        </div>
      </main>
      <MobileNav />
    </>
  );
}

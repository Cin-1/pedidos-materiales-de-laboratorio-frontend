import React, { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import MobileNav from "../../components/mobile-nav";
import useMaterialService from "../../services/material.service";
import handlePromise from "../../utils/promise";
import { Material } from "../../types/material";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useParams } from "react-router-dom";

export default function MaterialDetailView(): ReactElement {
  const { id } = useParams();

  const [materialData, setMaterialData] = useState<Material>();
  const materialService = useMaterialService();

  useEffect(() => {
    const fetchMaterials = async () => {
      if (id) {
        try {
          const [material, err] = await handlePromise(materialService.getMaterial(id));
          if (err) {
            throw err;
          }
          if (material) {
            setMaterialData(material);
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
    enableSearch: true,
    icon: "material.svg",
    searchPlaceholder: "Buscar Material",
    searchCallback: onSearchResult,
  };

  const handleChange = (event: SelectChangeEvent) => {
    console.log(materialData);
    console.log(event.target.value as string);
  };

  const onsubmit = () => {};

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
              value={materialData ? materialData.description : ""}
              rows={4}
              label="description"
              variant="outlined"
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
                value={materialData ? materialData.unitMeasure : ""}
                label="unidad de Medida"
                onChange={handleChange}
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
                value={materialData ? materialData.type : ""}
                label="unidad de Medida"
                onChange={handleChange}
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

            <Button type="submit" className="buttonStyle">
              Grabar
            </Button>
          </form>
        </div>
      </main>
      <MobileNav></MobileNav>
    </>
  );
}

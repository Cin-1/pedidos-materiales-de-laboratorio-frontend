import React, { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import MobileNav from "../../components/mobile-nav";
import useMaterialService from "../../services/material.service";
import handlePromise from "../../utils/promise";
import { Material } from "../../types/material";
import { User } from "../../types/user";
import  Dropdown  from "../../components/dropdown"
import TextField from "@mui/material/TextField";
import  useUserService  from "../../services/user.service"
import { Button } from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from "react-router-dom";


export default function MaterialDetailView(): ReactElement {
    
  const [materialData, setMaterialData] = useState<Material>();
  const materialService = useMaterialService();

  useEffect(()=>{ 
    const fetchMaterials = async () => {
      const materialId  = 0
      
      if (materialId){
          try {
          const [materials, err] = await handlePromise(materialService.getMaterial(materialId));      
          if (err)  {
            throw(err)
          }
          if(materials) {
            setMaterialData(materials);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchMaterials();
  } ,[]);

  const onSearchResult = (input:string)=>{
    //input ? setShowedMaterial(materialData.filter( m => m.description.toLowerCase().includes(input.toLowerCase()))):  setShowedMaterial(materialData);
    console.log("asd")
  }

  const headerAttributes = {
    title: "materiales",
    enableSearch:true,
    icon: 'material.svg',
    searchPlaceholder: 'Buscar Material',
    searchCallback: onSearchResult
  }

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value as string);
  };


  const onsubmit = ()=> {}

  return <>
    <Header {...headerAttributes}></Header>
    <main>
      <div  className="body">              
          <form onSubmit={onsubmit} className="formEndStyle">
            
            <TextField id="description" className="description" multiline  rows={4} label="description" variant="outlined" />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Stock</InputLabel>
              <Select 
                className="description"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={"Suficiente"}
                label="Stock"
                onChange={handleChange}
              >
                <MenuItem value={'Suficiente'}>Suficiente</MenuItem>
                <MenuItem value={'faltante'}>faltante</MenuItem>
              </Select>
            </FormControl>

              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Unidad/medida</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={"Ten"}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={'cm'}>cm</MenuItem>
                <MenuItem value={'ml'}>ml</MenuItem>
                <MenuItem value={'Copas mundiales'}>Copas mundiales</MenuItem>
                <MenuItem value={'Dedos de Frente'}>Dedos de Frente</MenuItem>
              </Select>
            </FormControl>


            <Button type="submit" className="buttonStyle">
              Grabar
            </Button>
            
          </form>
        </div>  
      </main>
      <MobileNav></MobileNav>
    </>;
}

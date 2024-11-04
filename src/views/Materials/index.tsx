import React, { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import MobileNav from "../../components/mobile-nav";
import useMaterialService from "../../services/material.service";
import handlePromise from "../../utils/promise";
import { Material } from "../../types/material";
import { User } from "../../types/user";
import  Dropdown  from "../../components/dropdown"
import  useUserService  from "../../services/user.service"
export default function MaterialsView(): ReactElement {
    
  const [materialData, setMaterialData] = useState<Material[]>([]);
  const [showedMaterial, setShowedMaterial] = useState<Material[]>([]);
  const [selectedid, setSelectedid] = useState<string>('');
  const materialService = useMaterialService();

  useEffect(()=>{ 
    const fetchMaterials = async () => {
      const [materials, err] = await handlePromise(materialService.getMaterials());      
      try {
        if (err)  {throw(err)}
        if(materials) {
          setMaterialData(materials);
          setShowedMaterial(materials);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchMaterials();
  } ,[]);

  const onSearchResult = (input:string)=>{
    input ? setShowedMaterial(materialData.filter( m => m.description.toLowerCase().includes(input.toLowerCase()))):  setShowedMaterial(materialData);
  }

  const headerAttributes = {
    title: "materiales",
    enableSearch:true,
    icon: 'material.svg',
    searchPlaceholder: 'Buscar Material',
    searchCallback: onSearchResult
  }

  return <>
    <Header {...headerAttributes}></Header>
    <main>
      <div  className="body">              
               { 
              showedMaterial.map((m,index) =>
                    <div className="listElements">
                      <Dropdown 
                        title= {m.description} 
                        icon=  {true}
                        desplegado= {selectedid == m._id}
                        description= {m.description}
                        stock= {m.stock?.toString() || '0' }
                        repair= {m.inRepair?.toString() || ''}
                        clase= {m.type}
                        onClick={() => selectedid == m._id ?  setSelectedid(""): setSelectedid(m._id)}
                        onEdition={() => alert("edicion de " + m._id)} 
                      />  
              </div>
              ) 
              } 
        </div>  
      </main>
      <MobileNav></MobileNav>
    </>;
}

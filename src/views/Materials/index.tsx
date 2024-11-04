import React, { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import CardMaterial from "../../components/card";
import MobileNav from "../../components/mobile-nav";
import useMaterialService from "../../services/material.service";
import handlePromise from "../../utils/promise";
import { Material } from "../../types/material";
import { User } from "../../types/user";
import  useUserService  from "../../services/user.service"
export default function MaterialsView(): ReactElement {
    
  const [materialData, setMaterialData] = useState<Material[]>([]);
  const materialService = useMaterialService();
 

  useEffect(()=>{ 
    const fetchMaterials = async () => {
      const [materials, err] = await handlePromise(materialService.getMaterials());      
      try {
        if (err)  {throw(err)}
        if(materials) {setMaterialData(materials)}
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchMaterials();
  } ,[]);

  const onSearchResult = (input:string)=>{
    console.log({input})
  }

  const headerAttributes = {
    title: "material",
    enableSearch:true,
    icon: 'material.svg',
    searchPlaceholder: 'Buscar material',
    searchCallback: onSearchResult
  }

  return <>
    <Header {...headerAttributes}></Header>
    <main>
      <div  className="body">
               {
                materialData.map((materialed,index) =>
                  <div className="listElements">
                      <CardMaterial title={materialed.description} 
                      date={materialed.usageDate.toString()} 
                      laboratory={materialed.labNumber?.toString() || ''} 
                        building={materialed.building || ''}
                      proffesor={ materialed.materialantUser} 
                      students={materialed.studentsNumber.toString()} 
                      />  
                  </div>  
                )
              } 
        </div>     
      </main>
      <MobileNav></MobileNav>
    </>;
}

import React, { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import MobileNav from "../../components/mobile-nav";
import useEquipmentService from "../../services/equipment.service";
import handlePromise from "../../utils/promise";
import { Equipment } from "../../types/equipment";
import { User } from "../../types/user";
import  Dropdown  from "../../components/dropdown"
import  useUserService  from "../../services/user.service"
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";


export default function EquipmentsView(): ReactElement {
  
  const navigate = useNavigate();
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [showedEquipment, setShowedEquipment] = useState<Equipment[]>([]);
  const [selectedid, setSelectedid] = useState<string>('');
  const equipmentService = useEquipmentService();

  useEffect(()=>{ 
    const fetchEquipments = async () => {
      const [equipments, err] = await handlePromise(equipmentService.getEquipments());      
      try {
        if (err)  {throw(err)}
        if(equipments) 
          {
            setEquipmentData(equipments.filter(e=>!e.isSoftDeleted));
            setShowedEquipment(equipments.filter(e=>!e.isSoftDeleted));
            
          }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchEquipments();
  } ,[]);

  const onSearchResult = (input:string)=>{
    input ? setShowedEquipment(equipmentData.filter( m => m.description.toLowerCase().includes(input.toLowerCase()))):  setShowedEquipment(equipmentData);
    console.log(showedEquipment)
  }

  const headerAttributes = {
    title: "equipos",
    enableSearch:true,
    icon: 'equipment.svg',
    searchPlaceholder: 'Buscar Equipo',
    searchCallback: onSearchResult
  }

  return <>
    <Header {...headerAttributes}></Header>
    <main>
      <div  className="body">              
               { 
              showedEquipment.map((m,index) =>
              <div className="listElements">
                      <Dropdown key={m._id}
                        title= {m.description} 
                        icon=  {true}
                        desplegado= {selectedid == m._id}
                        description= {m.description}
                        stock= {m.stock?.toString() || '0' }
                        repair= {m.inRepair?.toString() || '0'}
                        clase= {m.type}
                        onClick={() => selectedid == m._id ?  setSelectedid(""): setSelectedid(m._id)}
                        onEdition={() =>     navigate(`/equipments/${m._id}`)} 
                      />  
              </div>
              ) 
              } 
        </div>  
      </main>
      <div className="fbuttons">
        <Fab color="primary" aria-label="add" onClick={ () => navigate('New') } >
          <AddIcon />
        </Fab>
      </div>
      <MobileNav></MobileNav>
    </>;
}

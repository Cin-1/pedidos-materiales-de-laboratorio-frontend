import React, { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import CardRequest from "../../components/card";
import MobileNav from "../../components/mobile-nav";
import useRequestService from "../../services/request.service";
import handlePromise from "../../utils/promise";
import { Request } from "../../types/request";
import { User } from "../../types/user";
import  useUserService  from "../../services/user.service"
export default function RequestsView(): ReactElement {
    
  const [requestData, setRequestData] = useState<Request[]>([]);
  const [showedRequest, setShowedRequest] = useState<Request[]>([]);

  const requestService = useRequestService();
 

  useEffect(()=>{ 
    const fetchRequests = async () => {
      const [requesteds, err] = await handlePromise(requestService.getRequests());      
      try {
        if (err)  {throw(err)}
        if(requesteds) {
          setRequestData(requesteds);
          setShowedRequest(requesteds);
        }
        if(requesteds)
        {
          setRequestData(requesteds)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchRequests();
  } ,[]);

  const onSearchResult = (input:string)=>{
    input ? setShowedRequest(requestData.filter( m => m.description.toLowerCase().includes(input.toLowerCase()))):  setShowedRequest(requestData);
  }



  const headerAttributes = {
    title: "pedidos",
    enableSearch: true,
    icon: "request.svg",
    searchPlaceholder: "Buscar pedidos",
    searchCallback: onSearchResult,
  };

  return <>
    <Header {...headerAttributes}></Header>
    <main>
      <div  className="body">
               {
                showedRequest.map((requested,index) =>
                  <div className="listElements">
                      <CardRequest title={requested.description} 
                      date={requested.usageDate.toString()} 
                      laboratory={requested.labNumber?.toString() || ''} 
                      building={requested.building || ''}
                      proffesor={ requested.requestantUser} 
                      students={requested.studentsNumber.toString()} 
                      />  
                  </div>  
                )
              } 
        </div>     
      </main>
      <MobileNav></MobileNav>
    </>
  );
}

import React, { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import CardRequest from "../../components/card";
import MobileNav from "../../components/mobile-nav";
import useRequestService from "../../services/request.service";
import handlePromise from "../../utils/promise";

export default function RequestsView(): ReactElement {
  const [requestData, setRequestData] = useState(null);
  const requestService = useRequestService();


  useEffect(()=>{ 
    const fetchRequests = async () => {
      try {
      const [requested, err] = await handlePromise(requestService.getRequests());
      console.log(requested)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchRequests();
  } ,[requestService]);

  const onSearchResult = (input:string)=>{
    console.log({input})
  }

  const headerAttributes = {
    title: "pedidos",
    enableSearch:true,
    icon: 'request.svg',
    searchPlaceholder: 'Buscar pedidos',
    searchCallback: onSearchResult
  }



  return <>
    <Header {...headerAttributes}></Header>
    <main>
      <div  className="body">
             {/*  {requesteds.map((requested,index) =>
                <div className="listElements">
                    <CardRequest {... requested} />  
                </div>  
              )} */}
        </div>     
      </main>
      <MobileNav></MobileNav>
    </>;
}

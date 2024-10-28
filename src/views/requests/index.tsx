import React, { ReactElement } from "react";
import "./styles.scss";
import Header from "../../components/header";
import CardRequest from "../../components/card";
import MobileNav from "../../components/mobile-nav";

export default function RequestsView(): ReactElement {

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

  const requesteds  = [{
    title : "Bioquimica comision 25"
    ,date : "24/7/1993"
    ,laboratory :""
    ,building :""
    ,proffesor : ""
    ,students : "Carlos Lombardi"
    
  },
{
    title : "Bioquimica comision 25"
    ,date : "24/7/1993"
    ,laboratory :""
    ,building :""
    ,proffesor : ""
    ,students : "Carlos Lombardi"
    
  }]

  return <>
    <Header {...headerAttributes}></Header>
    <main>
      <div  className="body">
              {requesteds.map((requested,index) =>
                <div className="listElements">
                    <CardRequest {... requested} />  
                </div>  
              )}
        </div>     
      </main>
      <MobileNav></MobileNav>
    </>;
}

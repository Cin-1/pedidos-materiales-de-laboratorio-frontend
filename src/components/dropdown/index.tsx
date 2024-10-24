import React, { MouseEvent, ReactElement } from "react";
import { Link } from "react-router-dom";
import { EditOutlined } from "@mui/icons-material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./styles.scss";

export type dropProps = {
  title: string;
  icon: boolean;
  desplegado: boolean;
  description: string;
  stock: string;
  repair: string;
  clase: string;
};

export default function Dropdown({
  title,
  icon,
  desplegado,
  description,
  stock,
  repair,
  clase,
}: dropProps): ReactElement {
  return (
    <Link to={"/test"}>
      <div className="drop" style={{ paddingBottom: desplegado ? "5%" : undefined }}>
        <div className="drop-body">
          <div className="drop-header">
            <div>
              <h3 className="drop-title">{title}</h3>
            </div>
            <div className="icons">
              {icon && <EditOutlined fontSize="small" />}
              {icon && !desplegado && <ArrowRightIcon fontSize="medium" />}
              {desplegado && <ArrowDropDownIcon fontSize="medium" />}
            </div>
          </div>
          {desplegado && (
            <div>
              <p>Descripción: {description}</p>
              <div className="drop-info">
                <div>
                  <p>Stock: {stock}</p>
                  <p>En reparación: {repair}</p>
                </div>
                <div>
                  <p> Clase: {clase}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

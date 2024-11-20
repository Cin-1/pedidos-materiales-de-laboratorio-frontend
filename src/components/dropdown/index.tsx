import React, { MouseEvent, ReactElement } from "react";
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
  onClick?: () => void;
  onEdition?: () => void;
};

export default function Dropdown({
  title,
  icon,
  desplegado,
  description,
  stock,
  repair,
  clase,
  onClick,
  onEdition,
}: dropProps): ReactElement {
  return (
    <div>
      <div className="drop" style={{ paddingBottom: desplegado ? "5%" : undefined }}>
        <div className="drop-body">
          <div className="drop-header">
            <div>
              <h3 className="drop-title">{title}</h3>
            </div>
            <div className="icons">
              {icon && desplegado && (
                <div onClick={onEdition}>
                  {" "}
                  <EditOutlined fontSize="small" />{" "}
                </div>
              )}
              {icon && !desplegado && (
                <div onClick={onClick}>
                  <ArrowRightIcon fontSize="medium" />{" "}
                </div>
              )}
              {desplegado && (
                <div onClick={onClick}>
                  <ArrowDropDownIcon fontSize="medium" />{" "}
                </div>
              )}
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
    </div>
  );
}

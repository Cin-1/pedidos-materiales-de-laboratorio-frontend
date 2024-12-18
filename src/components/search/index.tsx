import React, { FormEvent, ReactElement } from "react";

import './styles.scss'
import { ImagesearchRoller, SearchOutlined } from "@mui/icons-material"
import { ZoomIn,ArrowDropUp }  from "@mui/icons-material"
import { Icon } from "@mui/material";



export type SearchProps = {
  placeholder: string;
  callback: (input: string) => void;
};

export default function Search({ placeholder, callback }: SearchProps): ReactElement {
  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.target as any).input.value;
    callback(input);
  };

  return (

    <form onSubmit={onSearch} className="searchform">
      <img src={`img/header/search.svg`}></img>
      <input className="searcher" type="text" name="input" id="input" placeholder={placeholder} />
    </form>

  );
}

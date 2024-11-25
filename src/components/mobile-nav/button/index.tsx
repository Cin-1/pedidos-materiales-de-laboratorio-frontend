import React, { ReactElement, HTMLAttributeAnchorTarget } from "react";
import { NavLink } from "react-router-dom";

export type NavButtonProps = {
  href: string;
  name: string;
  icon: string;
  target?: HTMLAttributeAnchorTarget | undefined;
};

export default function NavButton({ href, icon, target, name }: NavButtonProps): ReactElement {
  const lowerCaseName = name.toLocaleLowerCase();

  return (
    <NavLink to={href} className={"nav__button"} target={target || "_self"}>
      <img className="nav-icon" src={`/img/nav/${icon}`} alt="nav-button-image" />
      <span>{lowerCaseName}</span>
    </NavLink>
  );
}

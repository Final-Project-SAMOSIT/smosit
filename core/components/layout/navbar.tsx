import React from "react";
import { Observer } from "mobx-react-lite";

export const Navbar = () => {
  //---------------------
  //   RENDER
  //---------------------
  return <Observer>{() => <div className="w-full h-[90px]"></div>}</Observer>;
};

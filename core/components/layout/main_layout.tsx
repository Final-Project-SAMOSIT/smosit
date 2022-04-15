import React from "react";
import { Observer } from "mobx-react-lite";
import { Navbar } from "./navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="w-[100vw] h-full flex flex-col">
          <Navbar />
          <div className="overflow-y-auto">{children}</div>
        </div>
      )}
    </Observer>
  );
};

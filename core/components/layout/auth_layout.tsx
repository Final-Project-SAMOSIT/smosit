import React, { Fragment, useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { AuthContext } from "../../context/auth.context";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = (props: AuthLayoutProps) => {
  const { children } = props;
  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(AuthContext);

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    context.Me();
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() =>
        context.isLoading ? <p>loading</p> : <Fragment>{children}</Fragment>
      }
    </Observer>
  );
};

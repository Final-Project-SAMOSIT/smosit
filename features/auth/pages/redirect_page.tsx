import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { AuthContext } from "../../../core/context/auth.context";
import { useRouter } from "next/router";

export const Redirectpage = () => {
  //---------------------
  //   ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //   CONTEXT
  //---------------------
  const authContext = useContext(AuthContext);

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    authContext.getUser(router.query.code || "");
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return <Observer>{() => <div>loading...</div>}</Observer>;
};

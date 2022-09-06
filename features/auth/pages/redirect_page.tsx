import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { AuthContext } from "../../../core/context/auth.context";
import { useRouter } from "next/router";
import Loading from "../../../core/components/utility/loading";

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
  return (
    <Observer>
      {() => (
        <div className="w-full flex justify-center mt-[48px]">
          <Loading text="text-7xl" />
        </div>
      )}
    </Observer>
  );
};

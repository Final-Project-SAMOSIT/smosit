import React, { Fragment, useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { AuthContext } from "../../context/auth.context";
import { ModalContext } from "../../context/modal.context";
import { useTranslation } from "next-i18next";
import Loading from "../utility/loading";
import { useRouter } from "next/router";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = (props: AuthLayoutProps) => {
  const { children } = props;
  //---------------------
  //   i18n
  //---------------------
  const { t } = useTranslation("common");

  //---------------------
  //   CONTEXT
  //---------------------
  const router = useRouter();

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(AuthContext);
  const modal = useContext(ModalContext);

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    context.t = t;
    context.modal = modal;
    async function fetch() {
      await context.Me();
      if (
        context.me?.roles.role_name === "Admin" &&
        router.asPath !== "/users"
      ) {
        router.push("/users");
      }
    }
    fetch();
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() =>
        context.isLoading ? (
          <div className="w-full flex justify-center mt-[48px]">
            <Loading text="text-7xl" />
          </div>
        ) : (
          <Fragment>{children}</Fragment>
        )
      }
    </Observer>
  );
};

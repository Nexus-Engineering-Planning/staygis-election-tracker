"use client";

import {
  DrawerId,
  useDrawerActions,
  useOpenedDrawer,
  useRegisteredDrawers,
} from "@/stores/drawer-manager-store";
import React, { useEffect } from "react";
import SubmissionFormDrawer from "./submission-form-drawer";

interface DrawerProviderProps {
  children: React.ReactNode;
}

const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const { registerDrawer, unregisterDrawer } = useDrawerActions();
  const drawers = useRegisteredDrawers();
  const openedDrawer = useOpenedDrawer();

  useEffect(() => {
    registerDrawer(DrawerId.SUBMISSION_FORM_DRAWER, <SubmissionFormDrawer />);

    return () => {
      unregisterDrawer(DrawerId.SUBMISSION_FORM_DRAWER);
    };
  }, [registerDrawer, unregisterDrawer]);

  if (!drawers || !openedDrawer) return <>{children}</>;

  return (
    <>
      {children}
      {drawers[openedDrawer]}
    </>
  );
};

export default DrawerProvider;

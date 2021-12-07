import React, { FC, useState } from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import AlternateOnAuth from "../utils/AlternateOnAuth";
import Loading from "../utils/Loading";
import Items from "./Items";
import SidebarLoggedIn from "./SidebarLoggedIn";
import SidebarLoggedout from "./SidebarLoggedout";

const SideBar: FC = () => {
  return (
    <AlternateOnAuth
      isLoggedIn={true}
      fallbackCompoenent={Loading}
      alternative={SidebarLoggedout}
    >
      <SidebarLoggedIn />
    </AlternateOnAuth>
  );
};

export default SideBar;

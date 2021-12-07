import React, { FC, ReactElement, useEffect, useState } from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import SidebarAddItem from "./SidebarAddItem";
import SidebarComplete from "./SidebarComplete";
import SidebarDetails from "./SidebarDetails";
import SidebarEdit from "./SidebarEdit";
import SidebarNoActiveList from "./SidebarNoActiveList";

const SidebarLoggedIn: FC = () => {
  const sidebar = useAppSelector((state) => state.sidebarSlice.value);
  const [render, setRender] = useState<ReactElement>(<SidebarComplete />);
  useEffect(() => {
    console.log(sidebar);
    switch (sidebar.state) {
      case "complete":
        setRender(<SidebarComplete />);
        break;
      case "edit":
        setRender(<SidebarEdit />);
        break;

      case "noActive":
        setRender(<SidebarNoActiveList />);
        break;
      case "itemDetials":
        if (!sidebar.itemId) return;
        setRender(<SidebarDetails itemId={sidebar.itemId} />);
        break;
      case "addItem":
        setRender(<SidebarAddItem />);
        break;
    }
  }, [sidebar]);
  return <>{render}</>;
};

export default SidebarLoggedIn;

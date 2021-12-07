import React, { FC, ReactElement, useState } from "react";
import { MdMenu, MdHistory, MdOutlineShoppingCart } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import { useRouter } from "next/dist/client/router";

interface navLink {
  icon: ReactElement;
  lebal: string;
  link: string;
}

const Nav: FC = () => {
  const router = useRouter();
  const { pathname } = router;

  const navLinks: navLink[] = [
    {
      lebal: "items",
      icon: <MdMenu />,
      link: "/",
    },
    {
      lebal: "history",
      icon: <MdHistory />,
      link: "/history",
    },
    { lebal: "statistics", icon: <FaChartBar />, link: "/statistics" },
  ];
  return (
    <div className="bg-white w-24 h-full flex flex-col justify-between items-center py-8">
      <div>
        <div className="bg-gray-800 rounded-full w-12 h-12"></div>
      </div>
      <div className="flex flex-col gap-12 w-full">
        {navLinks.map((link, index) => (
          <div
            key={index}
            onClick={() => router.push(link.link)}
            className="group cursor-pointer text-2xl relative flex w-full justify-center items-center py-1.5"
          >
            {link.link === pathname ? (
              <div className="w-1.5 rounded-md bg-yellow-600 h-full absolute left-0"></div>
            ) : null}
            <div className="w-6 h-6">{link.icon}</div>
            <div className="absolute text-xs transform translate-x-14 flex items-center transition-all scale-0 group-hover:scale-100 origin-left">
              <div className="clip bg-darkBrown w-2 h-2 transform translate-x-1"></div>
              <div className=" bg-darkBrown text-white text-xs px-4 py-0.5 rounded-sm">
                {link.lebal}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-2xl bg-yellow-600 p-2 rounded-full text-white">
        <MdOutlineShoppingCart />
      </div>
    </div>
  );
};

export default Nav;

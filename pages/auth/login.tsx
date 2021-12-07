import { NextPage } from "next";
import React from "react";
import Login from "../../components/common/auth/Login";
import Loading from "../../components/utils/Loading";
import LoggedIn from "../../components/utils/LoggedIn";

const login: NextPage = () => {
  return (
    <LoggedIn fallbackCompoenent={Loading} rediret="/" isLoggedIn={false}>
      <Login />
    </LoggedIn>
  );
};

export default login;

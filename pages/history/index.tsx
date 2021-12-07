import { NextPage } from "next";
import React from "react";
import History from "../../components/common/History/History";
import Loading from "../../components/utils/Loading";
import LoggedIn from "../../components/utils/LoggedIn";

const history: NextPage = () => (
  <LoggedIn
    isLoggedIn={true}
    fallbackCompoenent={Loading}
    rediret="/auth/login"
  >
    <History />
  </LoggedIn>
);

export default history;

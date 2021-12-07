import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { loadavg } from "os";
import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import Categories from "../components/common/home/Categories";
import Loading from "../components/utils/Loading";
import LoggedIn from "../components/utils/LoggedIn";
import { BE } from "../constants";
import { PublicCategoriesData } from "../interfaces/publicCategoriesData";
import { add } from "../redux/slices/categories";
import { getToken } from "../utils/localStorage";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";

const Home: NextPage<{ data: PublicCategoriesData[] }> = ({ data }) => {
  return (
    <LoggedIn
      fallbackCompoenent={Loading}
      rediret="/auth/login"
      isLoggedIn={true}
    >
      <div className="w-10/12 mx-auto">
        <div className="mt-6 flex justify-between gap-16">
          <div className="text-4xl font-medium ">
            <span className="text-primary">Shoppingify</span> allows you take
            your shopping list wherever you go
          </div>
          {/* search item */}
          <label
            htmlFor="itemSearch"
            className="h-fit flex items-center bg-white rounded-xl overflow-hidden min-w-max"
          >
            <div className="text-lg px-4">
              <MdSearch />
            </div>
            <input
              className="py-2 pr-2 w-56 outline-none"
              type="text"
              placeholder="search item"
              id="itemSearch"
            />
          </label>
        </div>

        {/* categories */}
        <Categories data={data} />
      </div>
    </LoggedIn>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data: PublicCategoriesData[] = await axios
    .get(BE.publicCategories)
    .then((res) => res.data);
  return {
    props: { data }, // will be passed to the page component as props
  };
};

export default Home;

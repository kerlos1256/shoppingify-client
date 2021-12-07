import axios from "axios";
import React, { FC } from "react";
import { BE } from "../../constants";
import { changeState } from "../../redux/slices/sidebarSlice";
import { getToken } from "../../utils/localStorage";
import { useAppDispatch } from "../../utils/reduxHooks";
import Items from "./Items";

const SidebarComplete: FC = () => {
  const dispatch = useAppDispatch();

  const completeList = async () => {
    const token = await getToken();
    if (!token) return;

    axios({
      method: "post",
      url: BE.completeList,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => dispatch(changeState({ state: "noActive" })))
      .catch((err) => console.log(err));
  };

  const cancelList = async () => {
    const token = await getToken();
    if (!token) return;

    axios({
      method: "post",
      url: BE.cancelList,
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => dispatch(changeState({ state: "noActive" })))
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-secendary w-120 flex flex-col justify-between items-center">
      <div className="px-8">
        <div className="w-full bg-darkCrimsion py-2 px-4 flex mt-8 rounded-xl">
          <div className="w-24">svg</div>
          <div className="">
            <div className="text-white">Didn’t find what you need?</div>
            <div
              onClick={() => dispatch(changeState({ state: "addItem" }))}
              className="cursor-pointer select-none mt-2 mb-1 inline-block bg-white px-8 py-2 rounded-xl text-center"
            >
              Add item
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 px-8 overflow-y-scroll flex-grow no-scroll mt-8  w-full">
        <Items />
      </div>
      <div className="bg-white w-full h-28 flex gap-4 justify-center items-center">
        <div onClick={() => cancelList()} className="cursor-pointer px-4 py-3">
          cancel
        </div>
        <div
          onClick={() => completeList()}
          className="cursor-pointer bg-blue-400 px-4 py-3 rounded-xl text-white"
        >
          Complete
        </div>
      </div>
    </div>
  );
};

export default SidebarComplete;

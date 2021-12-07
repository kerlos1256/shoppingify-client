import axios from "axios";
import React, { FC, useState } from "react";
import { BE } from "../../constants";
import { changeState } from "../../redux/slices/sidebarSlice";
import { getToken } from "../../utils/localStorage";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import Items from "./Items";

const SidebarEdit: FC = () => {
  const list = useAppSelector((state) => state.currentList.value);
  const sidebar = useAppSelector((state) => state.sidebarSlice);
  const dispatch = useAppDispatch();

  const [saveable, setSaveable] = useState(false);

  const update = async () => {
    if (!list) return;
    const onlyItems: { itemId: number; quantity: number }[] = [];

    list.items.forEach((cate) => {
      cate.items.forEach((item) => {
        onlyItems.push({ itemId: item.id, quantity: item.quantity });
      });
    });

    const token = await getToken();
    console.log(onlyItems);

    axios({
      method: "post",
      url: BE.updateItems,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(onlyItems),
    })
      .then((res) => {
        dispatch(changeState({ state: "complete" }));
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className="py-2 px-8 w-full overflow-y-scroll flex-grow no-scroll mt-8">
        <Items setSaveable={setSaveable} />
      </div>
      <div className="bg-white w-full h-24 flex justify-center items-center">
        <div
          className={`flex border-2 ${
            saveable ? "border-primary" : "border-darkGray"
          } rounded-lg overflow-hidden max-w-min`}
        >
          <input
            className="outline-none w-56 p-2 rounded-lg"
            type="text"
            placeholder="Enter a name"
          />
          <div
            onClick={() => update()}
            className={`cursor-pointer select-none ${
              saveable ? "bg-primary" : "bg-darkGray"
            } py-2 px-4 rounded-tl-lg rounded-bl-lg`}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarEdit;

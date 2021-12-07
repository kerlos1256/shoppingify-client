import axios from "axios";
import React, { FC, useState } from "react";
import { BE } from "../../constants";
import { changeState } from "../../redux/slices/sidebarSlice";
import { getToken } from "../../utils/localStorage";
import { useAppDispatch } from "../../utils/reduxHooks";

const SidebarNoActiveList: FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<{ listName: string }>({
    listName: "",
  });
  const createList = async () => {
    if (value.listName.length < 1) return;
    const token = await getToken();

    axios({
      method: "post",
      url: BE.createList,
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(value),
    })
      .then(() => {
        dispatch(changeState({ state: "complete" }));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-secendary w-120 px-4 flex justify-between items-center">
      <div className="w-full bg-darkCrimsion justify-center items-center py-4 px-4 flex flex-col mt-8 rounded-xl">
        <div className="border-2 border-primary rounded-lg overflow-hidden">
          <input
            onChange={(e) => setValue({ listName: e.target.value })}
            placeholder="Enter a name for your list"
            type="text"
            className="w-64 px-8 py-2"
          />
        </div>

        <div
          onClick={() => createList()}
          className="cursor-pointer select-none mt-2 mb-1 inline-block bg-white px-8 py-2 rounded-xl text-center"
        >
          Create new list
        </div>
      </div>
    </div>
  );
};

export default SidebarNoActiveList;

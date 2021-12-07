import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect, useState } from "react";
import { BE } from "../../../constants";
import { HistoryList } from "../../../interfaces/historyList";
import { getToken } from "../../../utils/localStorage";

const List: FC<{ listId: any }> = ({ listId }) => {
  const [list, setList] = useState<HistoryList>();
  console.log(listId);
  useEffect(() => {
    getToken().then(async (token) => {
      console.log(listId);
      if (!listId) return;

      const list = await axios({
        method: "get",
        url: `${BE.getList}/${listId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((err) => console.log(err));
      if (list) {
        console.log("fetch");
        setList(list.data);
      }
    });
  }, []);
  return (
    <div className="w-10/12 mx-auto flex flex-col gap-8 my-4">
      <div>back</div>
      <div className="font-bold text-3xl">{list?.listName}</div>
      <div className="flex flex-col gap-8">
        {list?.items.map((cate, index) => (
          <div key={index} className="">
            <div className="mb-2">{cate.name}</div>
            <div className="flex">
              {cate.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg flex justify-between w-48 py-2 px-4 shadow-md"
                >
                  <div>{item.name}</div>
                  <div>{item.quantity}pcs</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

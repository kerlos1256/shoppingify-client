import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { BE } from "../../constants";
import { HistoryList } from "../../interfaces/historyList";
import { getToken } from "../../utils/localStorage";

const List: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [list, setList] = useState<HistoryList>();

  useEffect(() => {
    getToken().then(async (token) => {
      if (!id) return;
      const list = await axios({
        method: "get",
        url: `${BE.getList}/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((err) => console.log(err));
      if (list) {
        setList(list.data);
      }
    });
  }, [id]);

  return (
    <div className="w-10/12 mx-auto flex flex-col gap-8 my-4">
      <div
        onClick={() => router.push("/history")}
        className="cursor-pointer select-none flex items-center gap-2 text-primary"
      >
        <MdArrowBack /> back
      </div>
      {list && (
        <div className="flex flex-col gap-8">
          <div className="font-bold text-3xl">{list.listName}</div>
          <div className="flex flex-col gap-8">
            {list.items.map((cate, index) => (
              <div key={index} className="">
                <div className="mb-2">{cate.name}</div>
                <div className="flex">
                  {cate.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg flex justify-between w-48 py-2 px-4 shadow-md"
                    >
                      <div>{item.name}</div>
                      <div className="flex gap-1 items-center text-primary">
                        {item.quantity} <span>pcs</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;

import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BE } from "../../../constants";
import { HistoryList } from "../../../interfaces/historyLists";
import { getToken } from "../../../utils/localStorage";

const History: FC = () => {
  const [lists, setLists] = useState<HistoryList[]>([]);
  const router = useRouter();
  useEffect(() => {
    getToken().then(async (token) => {
      const { data } = await axios({
        method: "get",
        url: BE.getLists,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (lists) {
        setLists(data);
      }
    });
  }, []);

  return (
    <div className="w-10/12 mx-auto">
      <div className="text-3xl font-bold my-10">Shopping History</div>
      <div className="flex flex-col gap-8">
        {lists.map((list, index) => (
          <div
            key={index}
            className="shadow-md bg-white flex justify-between items-center py-4 px-4 rounded-lg"
          >
            <div className="fond-bold">{list.listName}</div>
            <div className="flex gap-8">
              <div
                className={`px-2 border rounded-lg ${
                  list.status === "canceled"
                    ? "border-red-400 text-red-400"
                    : "border-blue-400 text-blue-400"
                }`}
              >
                {list.status}
              </div>
              <MdOutlineKeyboardArrowRight
                onClick={() => router.push(`/history/${list.id}`)}
                className="cursor-pointer select-none text-3xl text-primary"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;

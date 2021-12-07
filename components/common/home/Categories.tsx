import React, { FC, useEffect, useState } from "react";
import {
  Item,
  PublicCategoriesData,
} from "../../../interfaces/publicCategoriesData";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { add } from "../../../redux/slices/categories";
import { getToken } from "../../../utils/localStorage";
import { BE } from "../../../constants";
import { NewItemData } from "../../../interfaces/newItemCurrentListData";
import { addItem } from "../../../redux/slices/listSlice";
const Categories: FC<{ data: PublicCategoriesData[] }> = ({ data }) => {
  const dispatch = useAppDispatch();
  const cates = useAppSelector((state) => state.categories);
  const [categories, setCategories] = useState<PublicCategoriesData[]>(data);

  const newItem = (item: Item, category: string) => {
    getToken().then((token) => {
      axios({
        method: "post",
        url: BE.newItem,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          name: item.name,
          category: category,
        }),
      })
        .then((res: { data: NewItemData }) => {
          console.log(res.data);
          dispatch(addItem(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  useEffect(() => {
    dispatch(add(data));
    const getPrivateCates = async () => {
      const token = await getToken();
      if (!token) return;
      axios({
        method: "get",
        url: BE.privateCategories,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res: { data: PublicCategoriesData[] }) => {
          dispatch(add(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPrivateCates();
  }, []);

  useEffect(() => {
    if (cates.length < 1) return;
    setCategories(cates);
  }, [cates]);

  return (
    <div className="w-full flex flex-col gap-4 mt-8">
      {categories.map((cate, index) => (
        <div className="py-2" key={index}>
          <div>{cate.name}</div>
          <div className="grid lg:grid-cols-4 grid-cols-2 my-4 px-4 gap-8">
            {cate.items.map((item, index) => (
              <div
                className="bg-white rounded-xl py-2 px-4 flex justify-between h-fit"
                key={index}
              >
                {item.name}
                <div
                  onClick={() => newItem(item, cate.name)}
                  className="text-gray-400 select-none py-1 px-2 cursor-pointer"
                >
                  <MdAdd />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;

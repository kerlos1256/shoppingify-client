import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BE } from "../../constants";
import {
  CurrentActiveList,
  ItemItem,
} from "../../interfaces/currentActiveList";
import {
  addInitalList,
  decressItem,
  deleteItem,
  done,
  incressItem,
} from "../../redux/slices/listSlice";
import { getToken } from "../../utils/localStorage";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import {
  MdEdit,
  MdAdd,
  MdRemove,
  MdDeleteOutline,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { changeState } from "../../redux/slices/sidebarSlice";

const Items: FC<{ setSaveable?: Dispatch<SetStateAction<boolean>> }> = ({
  setSaveable,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.currentList.value);
  const sidebar = useAppSelector((state) => state.sidebarSlice.value.state);

  const [activeList, setActiveList] = useState<CurrentActiveList>();
  const [edit, setEdit] = useState<number>();

  useEffect(() => {
    if (activeList) {
      if (!setSaveable) return;
      setSaveable(true);
    } else {
      if (!setSaveable) return;
      setSaveable(false);
    }
  }, [activeList]);

  useEffect(() => {
    setActiveList(list);
    console.log("list", list);
  }, [list]);

  useEffect(() => {
    if (sidebar !== "complete") return;
    console.log(sidebar);
    getToken().then((token) => {
      axios({
        method: "get",
        url: BE.currentActiveList,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res: { data: CurrentActiveList }) => {
          dispatch(addInitalList(res.data));
        })
        .catch((error) => {
          if (error.response.status === 404) {
            return dispatch(changeState({ state: "noActive" }));
          }
          router.push("/auth/login");
        });
    });
  }, [sidebar]);

  const DeleteItem = async (item: ItemItem) => {
    getToken()
      .then((token) => {
        axios({
          method: "delete",
          url: `${BE.deleteItem}${item.id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(() => {
            dispatch(
              deleteItem({ categoryId: item.categoryId, itemId: item.id })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => router.push("/auth/login"));
  };

  const DoneItem = async (item: ItemItem) => {
    const token = await getToken();

    axios({
      method: "post",
      url: `${BE.doneItem}${item.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(
          done({
            categoryId: item.categoryId,
            itemId: item.id,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full select-none">
      {activeList ? (
        <div className="flex flex-col gap-8">
          <div className="font-bold text-2xl flex justify-between items-center">
            {activeList.listName}{" "}
            {sidebar === "complete" ? (
              <MdEdit
                onClick={() => dispatch(changeState({ state: "edit" }))}
                className="cursor-pointer select-none"
              />
            ) : (
              ""
            )}
          </div>
          <div className="">
            {activeList.items.length > 0 ? (
              activeList.items.map((cate, index) => (
                <div key={index} className="mb-4">
                  <div className="text-gray-500">{cate.name}</div>
                  <div>
                    {cate.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center font-bold text-xl my-4 w-full"
                      >
                        <div className="flex items-center gap-1">
                          {sidebar === "complete" ? (
                            <div
                              onClick={() => DoneItem(item)}
                              className="cursor-pointer select-none text-primary self-start mt-1.5"
                            >
                              {item.done ? (
                                <MdOutlineCheckBox />
                              ) : (
                                <MdCheckBoxOutlineBlank />
                              )}
                            </div>
                          ) : null}
                          {item.name}
                        </div>
                        {edit && edit === item.id ? (
                          <div className="flex bg-white items-center text-2xl gap-1">
                            <div
                              onClick={() => DeleteItem(item)}
                              className="cursor-pointer bg-primary px-1 py-3 text-lg rounded-lg text-white"
                            >
                              <MdDeleteOutline />
                            </div>
                            <MdRemove
                              className="cursor-pointer"
                              onClick={() =>
                                dispatch(
                                  decressItem({
                                    itemId: item.id,
                                    categoryId: item.categoryId,
                                  })
                                )
                              }
                            />
                            <div
                              onClick={() => setEdit(0)}
                              className="cursor-pointer text-primary flex gap-1.5 px-4 py-1.5 w-fit text-sm border-2 border-primary rounded-full"
                            >
                              {item.quantity} <span>pcs</span>
                            </div>
                            <MdAdd
                              onClick={() =>
                                dispatch(
                                  incressItem({
                                    categoryId: item.categoryId,
                                    itemId: item.id,
                                  })
                                )
                              }
                              className="pr-1 cursor-pointer"
                            />
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              if (sidebar !== "edit") return;
                              setEdit(item.id);
                            }}
                            className="cursor-pointer select-none text-primary flex gap-1.5 px-4 py-1.5 w-fit text-sm border-2 border-primary rounded-full"
                          >
                            {item.quantity} <span>pcs</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-4xl h-full w-full text-center">No Items</div>
            )}
          </div>
        </div>
      ) : (
        <div>no list</div>
      )}
    </div>
  );
};

export default Items;

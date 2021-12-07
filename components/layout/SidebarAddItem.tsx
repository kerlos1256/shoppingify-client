import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import * as yup from "yup";
import { BE } from "../../constants";
import { NewItemData } from "../../interfaces/newItemCurrentListData";
import { addItem } from "../../redux/slices/listSlice";
import { changeState } from "../../redux/slices/sidebarSlice";
import { getToken } from "../../utils/localStorage";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";

interface input {
  label: string;
  type: "text" | "textarea" | "dropdown";
  optional: boolean;
}

const newItemSchema = yup.object().shape({
  name: yup.string().required().min(1),
  note: yup.string(),
  image: yup.string(),
  category: yup.string().required(),
});

const SidebarAddItem: FC = () => {
  const cates = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  const [focus, setFoucs] = useState<number>();
  const [value, setValue] = useState<any>({
    name: "",
    note: "",
    image: "",
    category: "",
  });
  const [sendable, setSendable] = useState<boolean>();
  const inputs: input[] = [
    {
      label: "Name",
      optional: false,
      type: "text",
    },
    {
      label: "Note",
      optional: true,
      type: "textarea",
    },
    {
      label: "Image",
      optional: true,
      type: "text",
    },
    {
      label: "Category",
      optional: false,
      type: "dropdown",
    },
  ];
  useEffect(() => {
    newItemSchema.isValid(value).then((res) => {
      console.log(res);
      if (res) {
        setSendable(true);
      } else {
        setSendable(false);
      }
    });
  }, [value]);

  const newItem = async () => {
    const token = await getToken();

    if (!token) return;

    axios({
      method: "post",
      url: BE.newItem,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(value),
    }).then((res: { data: NewItemData }) => {
      setValue({
        name: "",
        note: "",
        image: "",
        category: "",
      });
      dispatch(addItem(res.data));
      dispatch(changeState({ state: "complete" }));
    });
  };

  return (
    <div className="bg-gray-200 w-120 px-8 flex flex-col justify-between items-center">
      <div className="overflow-y-scroll no-scroll w-full flex flex-col mt-8 ">
        <div className="text-2xl font-bold">Add a new item</div>
        {inputs.map(({ label, type, optional }, index) => (
          <div
            onBlur={() => setFoucs(undefined)}
            key={index}
            className="mt-4 flex flex-col"
          >
            <div>
              {label} {optional ? <span>(optional)</span> : null}
            </div>
            <label
              onFocus={() => setFoucs(index)}
              className={` px-4 py-3 border-2 rounded-xl bg-white ${
                focus !== undefined && focus === index
                  ? "border-primary"
                  : "border-darkGray"
              } ${type === "textarea" ? "h-28" : ""} flex`}
            >
              {type === "textarea" ? (
                <textarea
                  name={label}
                  value={value[label.toLowerCase()]}
                  onChange={(e) => {
                    setValue({
                      ...value,
                      [label.toLowerCase()]: e.target.value,
                    });
                  }}
                  className="resize-none w-full h-full no-scroll outline-none"
                  placeholder={`enter a ${label.toLowerCase()}`}
                />
              ) : (
                <input
                  name={label}
                  placeholder={`enter a ${label.toLowerCase()}`}
                  type="text"
                  value={value[label.toLowerCase()]}
                  onChange={(e) =>
                    setValue({
                      ...value,
                      [label.toLowerCase()]: e.target.value,
                    })
                  }
                  className="break-words outline-none w-full"
                />
              )}
              {value[label.toLowerCase()].length > 0 ? (
                <MdClose
                  className="select-none cursor-pointer"
                  onClick={() =>
                    setValue({ ...value, [label.toLowerCase()]: "" })
                  }
                />
              ) : null}
            </label>
            {type === "dropdown" && focus === index ? (
              <div className="my-2 rounded-xl w-full flex flex-col gap-2 bg-white py-1.5 px-1.5 border shadow-md border-darkGray">
                {cates.map((cate, index) => (
                  <div
                    onMouseDown={() =>
                      setValue({ ...value, category: cate.name })
                    }
                    key={index}
                    className="cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 py-1.5 px-6 rounded-lg"
                  >
                    {cate.name}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex gap-4 py-2 mb-4 justify-center items-center">
        <div className="cursor-pointer select-none px-6 py-3 rounded-xl">
          cancel
        </div>
        <div
          onClick={newItem}
          className={`text-white px-6 py-3 cursor-pointer select-none ${
            sendable ? "bg-primary" : "bg-gray-400"
          } rounded-xl`}
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default SidebarAddItem;

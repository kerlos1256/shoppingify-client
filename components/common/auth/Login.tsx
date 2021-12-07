import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect, useState } from "react";
import { BE } from "../../../constants";
import { getUser, setToken } from "../../../utils/localStorage";
import * as yup from "yup";
import { useAppDispatch } from "../../../utils/reduxHooks";
import { setUser } from "../../../redux/slices/userSlice";

const loginSchema = yup.object().shape({
  username: yup.string().required().min(2).max(20),
  password: yup.string().required().min(6),
});

interface inputErr {
  name: string;
  err: string;
}

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [inputErrs, setInputErrs] = useState<inputErr[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [value, setValue] = useState({});
  const [inputValid, setInputValid] = useState<boolean>(false);

  useEffect(() => {
    loginSchema.isValid(value).then((valid) => setInputValid(valid));
  }, [value]);

  const loginCall = () => {
    if (!inputValid) return;
    axios({
      method: "post",
      url: BE.login,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(value),
    })
      .then((res) => {
        setToken(res.data.access_token)
          .then(() =>
            getUser().then((user) => {
              if (user) {
                dispatch(setUser(user));
              }
            })
          )
          .then(() => router.push("/"));
      })
      .catch((err) => {
        setErrors([err.response.data.message]);
      });
  };

  const inputs = [
    {
      name: "username",
      type: "text",
      placeholder: "Enter your username",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  return (
    <div className="flex justify-center items-center h-full">
      <div className=" bg-white rounded-xl flex flex-col gap-6 py-8 px-4">
        {inputs.map((input, index) => (
          <div key={index}>
            <input
              className="w-120 py-2 px-4 outline-none border-2 border-darkGray rounded-xl"
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              onChange={(e) => {
                const minValue = e.target.name === "password" ? 6 : 2;
                const schema = yup.string().required().min(minValue);
                const otherErrs = inputErrs.filter(
                  (err) => err.name !== input.name
                );
                schema
                  .validate(e.target.value)
                  .then(() =>
                    setInputErrs([...otherErrs, { name: input.name, err: "" }])
                  )
                  .catch((err) => {
                    setInputErrs([
                      ...otherErrs,
                      {
                        name: input.name,
                        err: err.errors[0],
                      },
                    ]);
                  });
                setValue({ ...value, [input.name]: e.target.value });
              }}
            />
            <div className="ml-2 text-red-600 border-b border-red-700 w-fit ">
              {inputErrs.map((err, index) =>
                err.name == input.name ? err.err : null
              )}
            </div>
          </div>
        ))}
        {errors.length > 0 ? (
          <div className="bg-red-200 w-96 self-center py-2 border-2 border-red-400 rounded-xl">
            {errors.map((err, index) => (
              <div key={index} className={`font-semibold px-4 `}>
                {err}
              </div>
            ))}
          </div>
        ) : null}
        <div
          onClick={() => loginCall()}
          className={`px-8 py-2 ${
            inputValid ? "bg-primary" : "bg-gray-400"
          } transition-all rounded-xl w-fit text-white self-center cursor-pointer select-none`}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;

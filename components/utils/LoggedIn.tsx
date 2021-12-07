import { useRouter } from "next/dist/client/router";
import { FC, ReactNode, useEffect, useState } from "react";
import { removeUser, setUser } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";

const LoggedIn: FC<{
  fallbackCompoenent: ReactNode;
  isLoggedIn: boolean;
  rediret: string;
}> = ({ children, fallbackCompoenent, isLoggedIn, rediret }) => {
  const user = useAppSelector((state) => state.userSlice.value);
  const router = useRouter();
  const [component, setComponent] = useState<ReactNode>(fallbackCompoenent);
  useEffect(() => {
    const handle = async () => {
      const User = await user;
      if (isLoggedIn) {
        if (User) {
          setComponent(children);
        } else {
          router.push(rediret);
        }
      } else {
        if (User) {
          router.push(rediret);
        } else {
          setComponent(children);
        }
      }
    };
    handle();
  }, [user]);
  return <>{component}</>;
};

export default LoggedIn;

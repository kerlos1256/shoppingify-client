import { FC, ReactNode, useEffect, useState } from "react";
import { removeUser, setUser } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";

const AlternateOnAuth: FC<{
  fallbackCompoenent: ReactNode;
  alternative: ReactNode;
  isLoggedIn: boolean;
}> = ({ children, fallbackCompoenent, isLoggedIn, alternative }) => {
  const user = useAppSelector((state) => state.userSlice.value);
  const [component, setComponent] = useState<ReactNode>(fallbackCompoenent);
  useEffect(() => {
    const handle = async () => {
      const User = await user;
      if (isLoggedIn) {
        if (User) {
          setComponent(children);
        } else {
          setComponent(alternative);
        }
      } else {
        if (User) {
          setComponent(alternative);
        } else {
          setComponent(children);
        }
      }
    };
    handle();
  }, [user]);
  return <>{component}</>;
};

export default AlternateOnAuth;

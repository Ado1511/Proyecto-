/* eslint-disable tailwindcss/classnames-order */
import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";

const Profile = () => {
  const user = useSelector((state: TRootState) => state.UserSlice);

  return (
    <div className="flex flex-col items-center justify-start gap-10 " style={{background: `linear-gradient(#ff9846, #ffffff)`}}>
            {user.isLoggedIn && <p className="text-lg"></p>}
    <div className="flex flex-col items-center justify-start min-h-screen gap-2">
      <h1 className="text-2xl">Profile Page</h1>
      <p className="text-lg dark:text-white">
        Welcome {user.user?.name.first + " " + user.user?.name.last}
      </p>
    </div>
    </div>
  );
};

export default Profile;

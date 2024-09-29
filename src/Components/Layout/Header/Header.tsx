/* eslint-disable tailwindcss/classnames-order */
import { Navbar, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { CiSearch } from "react-icons/ci";
import { searchActions } from "../../../Store/SearchSlice";
import { toast } from "react-toastify";

const Header = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const dispatch = useDispatch();
  const nav = useNavigate();



  const logout = () => {
    dispatch(userActions.logout());
    nav("/");  
    toast.success("You signed out");  
  };
  
  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchActions.searchWord(value));
  };

  return (
    <Navbar fluid rounded className="bg-orange-600">
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <span className="self-center text-xl font-semibold text-white whitespace-nowrap">
          BizSnap
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>

        <Navbar.Link as={Link} to={"/"} href="/" className="text-white">
          Home
        </Navbar.Link>

        {user?.isBusiness && <Navbar.Link as={Link} to={"/mycards"} href="/mycards" className="text-white">
          My Cards
        </Navbar.Link>}

        {!user && (
          <Navbar.Link
            as={Link}
            to={"/signin"}
            href="/signin"
            className="text-white"
          >
            Sign In
          </Navbar.Link>

        )}
        {user && (
          <Navbar.Link className="text-white cursor-pointer" onClick={logout}>
            Sign Out
          </Navbar.Link>
        )}

        {user && (
          <>
            <Navbar.Link
              as={Link}
              to={"/profile"}
              href="/profile"
              className="text-white"
            >
              Profile
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to={"/favorites"}
              href="/favorites"
              className="text-white"
            >
              Favorites
            </Navbar.Link>
          </>
        )}

      </Navbar.Collapse>
      <TextInput rightIcon={CiSearch} onChange={search} />
    </Navbar>
  );
};

export default Header;

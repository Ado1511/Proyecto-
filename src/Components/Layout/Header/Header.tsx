import { Navbar, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { CiSearch } from "react-icons/ci";
import { searchActions } from "../../../Store/SearchSlice";
import { toast } from "react-toastify";
import { MdNightlight } from "react-icons/md";
import React from "react";

interface HeaderProps {
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode }) => {
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
    <Navbar fluid rounded className="bg-slate-100 dark:bg-slate-800">
      <Navbar.Brand as={Link} to="/">
        <span className="self-center pl-10 text-xl italic font-semibold text-dark dark:text-white whitespace-nowrap">
          BizSnap
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" className="text-dark dark:text-white">
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/about" className="text-dark dark:text-white">
          About
        </Navbar.Link>
        {user?.isBusiness && (
          <Navbar.Link as={Link} to="/mycards" className="text-dark dark:text-white">
            My Cards
          </Navbar.Link>
        )}
        {!user && (
          <>
            <Navbar.Link as={Link} to="/signin" className="text-dark dark:text-white">
              Sign In
            </Navbar.Link>
            <Navbar.Link as={Link} to="/signup" className="text-dark dark:text-white">
              Sign Up
            </Navbar.Link>
          </>
        )}
        {user && (
          <>
            <Navbar.Link as={Link} to="/profile" className="text-dark dark:text-white">
              Profile
            </Navbar.Link>
            <Navbar.Link as={Link} to="/favorites" className="text-dark dark:text-white">
              Favorites
            </Navbar.Link>
            <Navbar.Link className="cursor-pointer text-dark dark:text-white" onClick={logout}>
              Sign Out
            </Navbar.Link>
          </>
        )}
        <button onClick={toggleDarkMode} className="ml-4 text-dark dark:text-white size-5">
          <MdNightlight className="text-dark dark:text-yellow-400" />
        </button>
      </Navbar.Collapse>
      <TextInput 
        rightIcon={CiSearch} 
        onChange={search} 
        placeholder="Search..."
        className="ml-4" 
      />
    </Navbar>
  );
};

export default Header;

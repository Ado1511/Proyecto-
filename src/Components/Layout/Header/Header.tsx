import { Navbar, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { CiSearch } from "react-icons/ci";
import { searchActions } from "../../../Store/SearchSlice";
import { toast } from "react-toastify";
import { MdNightlight} from "react-icons/md";
import React from "react";

interface HeaderProps {
  toggleDarkMode: () => void; 
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode }) => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const dispatch = useDispatch();
  const [isDarkMode] = React.useState(false);
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
    <Navbar fluid rounded className="bg-slate-100">
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <span className="self-center pl-10 text-xl italic font-semibold text-dark whitespace-nowrap">
          BizSnap
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to={"/"} href="/" className="text-dark">
          Home
        </Navbar.Link>

      
        <Navbar.Link as={Link} to={"/about"} href="/about" className="text-dark">
          About
        </Navbar.Link> 


        {user?.isBusiness && (
          <Navbar.Link as={Link} to={"/mycards"} href="/mycards" className="text-dark">
            My Cards
          </Navbar.Link>
        )}

        {!user && (
          <>
            <Navbar.Link as={Link} to={"/signin"} href="/signin" className="text-dark">
              Sign In
            </Navbar.Link>
            <Navbar.Link as={Link} to={"/signup"} href="/signup" className="text-dark">
              Sign Up
            </Navbar.Link>
          </>
        )}
        
        {user && (
          <>
            <Navbar.Link as={Link} to={"/profile"} href="/profile" className="text-dark">
              Profile
            </Navbar.Link>
            <Navbar.Link as={Link} to={"/favorites"} href="/favorites" className="text-dark">
              Favorites
            </Navbar.Link>
          </>
        )}

{user && (
          <Navbar.Link className="cursor-pointer text-dark" onClick={logout}>
            Sign Out
          </Navbar.Link>
        )}

        
        <button 
          onClick={toggleDarkMode} 
          className="ml-4 text-dark size-5">
          <MdNightlight  
          className={isDarkMode ? "text-yellow-400" : "text-dark"} 
          />
        </button>
      </Navbar.Collapse>
      <TextInput rightIcon={CiSearch} onChange={search} />
    </Navbar>
  );
};

export default Header;

import { Navbar, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { CiSearch } from "react-icons/ci";
import { searchActions } from "../../../Store/SearchSlice";
import { toast } from "react-toastify";
import { MdNightlight } from "react-icons/md";
import React, { useState } from "react";

interface HeaderProps {
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode }) => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del navbar

  const logout = () => {
    dispatch(userActions.logout());
    nav("/");
    toast.success("You signed out");
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchActions.searchWord(value));
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Cerrar el navbar al hacer clic en un enlace
  };

  return (
    <Navbar fluid rounded className="bg-slate-100 dark:bg-slate-800">
      <Navbar.Brand as={Link} to="/">
        <span className="self-center pl-10 text-xl italic font-semibold text-dark dark:text-white whitespace-nowrap">
          BizSnap
        </span>
      </Navbar.Brand>
      <Navbar.Toggle onClick={() => setIsOpen(!isOpen)} /> {/* Alternar el estado */}
      <Navbar.Collapse className={`flex-col md:flex-row md:items-center md:justify-between ${isOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <Navbar.Link as={Link} to="/" className="text-dark dark:text-white" onClick={handleLinkClick}>
            Home
          </Navbar.Link>
          <Navbar.Link as={Link} to="/about" className="text-dark dark:text-white" onClick={handleLinkClick}>
            About
          </Navbar.Link>
          {user?.isBusiness && (
            <Navbar.Link as={Link} to="/mycards" className="text-dark dark:text-white" onClick={handleLinkClick}>
              My Cards
            </Navbar.Link>
          )}
          {!user && (
            <>
              <Navbar.Link as={Link} to="/signin" className="text-dark dark:text-white" onClick={handleLinkClick}>
                Sign In
              </Navbar.Link>
              <Navbar.Link as={Link} to="/signup" className="text-dark dark:text-white" onClick={handleLinkClick}>
                Sign Up
              </Navbar.Link>
            </>
          )}
          {user && (
            <>
              <Navbar.Link as={Link} to="/profile" className="text-dark dark:text-white" onClick={handleLinkClick}>
                Profile
              </Navbar.Link>
              <Navbar.Link as={Link} to="/favorites" className="text-dark dark:text-white" onClick={handleLinkClick}>
                Favorites
              </Navbar.Link>
              <Navbar.Link className="cursor-pointer text-dark dark:text-white" onClick={logout}>
                Sign Out
              </Navbar.Link>
            </>
          )}
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <button onClick={toggleDarkMode} className="ml-4 text-dark dark:text-white size-5">
            <MdNightlight className="text-dark dark:text-yellow-400" />
          </button>
          <TextInput 
            rightIcon={CiSearch} 
            onChange={search} 
            placeholder="Search..."
            className="ml-4" 
          />
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;


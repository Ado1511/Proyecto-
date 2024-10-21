import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Components/Layout/Header/Header";
import Footer from "./Components/Layout/Footer/Footer";
import SignIn from "./Pages/SignIn/SignIn";
import Profile from "./Pages/Profile/Profile";
import RouteGuard from "./Components/Shared/RouteGuard";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "./Store/BigPie";
import CardDetails from "./Pages/CardDetails/CardDetails";
import Favorites from "./Pages/Favorites/Favorites";
import MyCards from "./Pages/MyCards/MyCards";
import CreateCard from "./Pages/CreateCard/CreateCard"; 
import { useEffect, useState } from "react"; 
import { decode } from "./Services/tokenService";
import axios from "axios";
import { userActions } from "./Store/UserSlice";
import SignUp from "./Pages/SingUp/Register";
import About from "./Pages/About/About";
import EditCard from "./Pages/MyCards/EditeCards";
import CardList from "./Pages/Paguinacion/CardList";



function App() {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para el modo nocturno

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token; 
      const decodedUser = decode(token); 
      const userId = decodedUser._id;

      
      axios
        .get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`)
        .then((response) => {
          dispatch(userActions.login(response.data)); // Restaura el usuario en el estado global
        })
        .catch((error) => {
          console.error("Error restoring session:", error);
        });
    }
  }, [dispatch]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode); // Alternar el modo nocturno
  };

  return (
    <div className={isDarkMode ? "dark text-white" : ""}> 
      <Header toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/editcard/:id" element={<RouteGuard user={user!}><EditCard /></RouteGuard>} />
        <Route path="/cards" element={<RouteGuard user={user!}><CardList /></RouteGuard>} />

        
        <Route
          path="/profile"
          element={<RouteGuard user={user!}><Profile /></RouteGuard>} />

        <Route
          path="/mycards"
          element={<RouteGuard user={user!}><MyCards /></RouteGuard>} />

        <Route
          path="/createcard"
          element={<RouteGuard user={user!}><CreateCard /></RouteGuard>} />

        <Route
          path="/favorites"
          element={<RouteGuard user={user!}><Favorites /></RouteGuard>} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;

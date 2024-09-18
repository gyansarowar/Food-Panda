import { useState } from "react";
import { HamburgerIcon, SearchIcon, CloseIcon } from "@chakra-ui/icons";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useFood } from "./FoodContext";
import { useFirebase } from "../Firebase/Firebase";
// import Signin from "./Signin";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [delivery, setDelivery] = useState(true);
  const { selectedFood } = useFood();
  const { LogOut, isLoggedIn } = useFirebase();
  // const [signIn,setSignIn]=useState(false);
  const navigate = useNavigate();
  const onLoginClick = () => {
    navigate("/signin");
  };

  return (
    <>
      <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
        {/* LEFT SIDE */}
        <div className="flex items-center">
          <div onClick={() => setNav(!nav)} className="cursor-pointer">
            <HamburgerIcon boxSize={30} />
          </div>
          <Link to="/">
            <button className="text-2xl sm:text-3xl font-mono lg:text-4xl px-2">
              <span className="font-bold">Food</span>Panda!
            </button>
          </Link>
          <div className="hidden sm:flex  items-center bg-gray-200 rounded-full p-1 text-[14px]">
            <button
              onClick={() => setDelivery(true)}
              className={
                delivery ? "bg-black text-white rounded-full p-2" : "p-2"
              }
            >
              Delivery
            </button>
            <button
              onClick={() => setDelivery(false)}
              className={
                delivery ? "p-2" : "bg-black text-white rounded-full p-2"
              }
            >
              Pickup
            </button>
          </div>
        </div>
        <div className=" flex flex-row items-center justify-center space-x-2">
          {!isLoggedIn && (
            <button
              onClick={onLoginClick}
              className="flex items-center bg-black rounded-full py-2 px-4 font-medium text-gray-200"
            >
              Login
            </button>
          )}
          <Link to="/cart">
            <button className="bg-black text-white flex py-2 px-4 rounded-full items-center">
              <ShoppingCartIcon />
              <span className=" font-mono text-gray-300 text-xl">
                {selectedFood.length}
              </span>
            </button>
          </Link>
        </div>
        {/* MOBILE MENU */}

        {/*OVERLAY*/}

        {nav ? (
          <div className="bg-black/80 fixed w-full h-screen  z-10 top-0 left-0"></div>
        ) : (
          ""
        )}

        {/* SIDE DRAWER MENU */}

        <div
          className={
            nav
              ? "fixed top-0  left-0 w-[250px] h-screen z-10 bg-white duration-300"
              : "fixed top-0  left-[-100%] w-[250px] h-screen z-10 bg-white duration-300"
          }
        >
          <CloseIcon
            onClick={() => setNav(!nav)}
            boxSize={5}
            className="absolute right-4 top-4 cursor-pointer"
          />
          <h2 className="text-2xl p-4 font-mono">
            <span className="font-bold">Food</span>Panda!
          </h2>
          <div>
            <ul className="flex flex-col p-4">
              <Link to="/orderhistory">
                <button onClick={() => setNav(!nav)} className="w-2/3">
                  <li className="text-xl py-2 font-medium font-mono flex">
                    <DeliveryDiningIcon
                      style={{ fontSize: "2rem" }}
                      className="mr-4"
                    />
                    Orders
                  </li>
                </button>
              </Link>
              {isLoggedIn && (
                <a href="/">
                  <button onClick={LogOut} className="w-2/3">
                    <li className="text-xl py-2 font-medium font-mono flex">
                      <LogoutIcon
                        style={{ fontSize: "2rem" }}
                        className="mr-4"
                      />
                      LogOut
                    </li>
                  </button>
                </a>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

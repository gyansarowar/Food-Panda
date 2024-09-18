import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HeadlineCards from "./components/HeadlineCards";
import Food from "./components/Food";
import Category from "./components/Category";
import Cart from "./components/Cart";
import { FoodProvider } from "./components/FoodContext";
import OrderHistory from "./components/OrderHistory";
import { FirebaseProvider } from "./Firebase/Firebase";
import Signin from "./components/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <FoodProvider>
          <FirebaseProvider>
            {/* <Navbar /> */}
            <Hero />
            <HeadlineCards />
            <Food />
            <Category />
          </FirebaseProvider>
        </FoodProvider>
      </>
    ),
  },
  {
    path: "/signin",
    element: (
      <>
        <FoodProvider>
          <FirebaseProvider>
            {/* <Login /> */}
            <Signin />
          </FirebaseProvider>
        </FoodProvider>
      </>
    ),
  },

  {
    path: "/cart",
    element: (
      <>
        <FoodProvider>
          <FirebaseProvider>
            <Navbar />
            <Cart />
            <Category />
          </FirebaseProvider>
        </FoodProvider>
      </>
    ),
  },
  {
    path: "/orderhistory",
    element: (
      <>
        <FoodProvider>
          <FirebaseProvider>
            <Navbar />
            <OrderHistory />
            <Category />
          </FirebaseProvider>
        </FoodProvider>
      </>
    ),
  },
]);

function App() {
  return (
    // <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
    // </React.StrictMode>
  );
}

export default App;

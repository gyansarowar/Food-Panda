import { useState } from "react";
import { data } from "../data/data";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useFood } from "./FoodContext";
// import { Login } from "@mui/icons-material";
const Food = () => {
  const [foods, setFoods] = useState(data);

  const { handleSelectedFood } = useFood();
  // console.log(selectedFood);

  const filterType = (category) => {
    setFoods(
      data.filter((item) => {
        return item.category === category;
      })
    );
  };
  

  {
    /*Filter by price */
  }
  const filterPrice = (price) => {
    setFoods(
      data.filter((item) => {
        return item.price === price;
      })
    );
  };

  return (
    <div className="max-w-[1640px] m-auto px-4 py-12 ">
      <h1 className=" text-orange-600 font-mono font-bold text-4xl text-center">
        Top Rated Menu Items
      </h1>
      {/*Filter Row */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/*Filter Type */}
        <div>
          <p className="font-bold text-gray-700 ">Filter Type</p>
          <div className=" flex justify-between flex-wrap">
            <button
              onClick={() => setFoods(data)}
              className="m-1 font-mono border px-4 py-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white "
            >
              All
            </button>
            <button
              onClick={() => filterType("burger")}
              className="m-1 font-mono border px-4 py-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white "
            >
              Burgers
            </button>
            <button
              onClick={() => filterType("pizza")}
              className="m-1 font-mono border px-4 py-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white "
            >
              Pizza
            </button>
            <button
              onClick={() => filterType("salad")}
              className="m-1 font-mono border px-4 py-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white "
            >
              Salads
            </button>
            <button
              onClick={() => filterType("chicken")}
              className="m-1 font-mono border px-4 py-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white "
            >
              Chicken
            </button>
          </div>
        </div>
        {/*Filter Price */}

        <div>
          <p className="font-bold text-gray-700 ">Filter Price</p>
          <div className=" flex justify-between max-w-[390px]">
            <button
              onClick={() => filterPrice("$")}
              className="m-1 font-mono border px-4 py-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white "
            >
              $
            </button>
            <button
              onClick={() => filterPrice("$$")}
              className="m-1 font-mono border px-4 py-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white "
            >
              $$
            </button>
            <button
              onClick={() => filterPrice("$$$")}
              className="m-1 font-mono border px-4 py-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white "
            >
              $$$
            </button>
            <button
              onClick={() => filterPrice("$$$$")}
              className="m-1 font-mono border px-4 py-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white "
            >
              $$$$
            </button>
          </div>
        </div>
      </div>
      {/*Display Foods */}
      <div className=" grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {foods.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="border h-max shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className=" w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="block px-2 py-4 overflow-hidden">
              <div className="flex justify-center">
                <p className="font-bold flex text-center  cursor-default">
                  {item.name}
                </p>
              </div>
              <div className=" flex align-bottom   justify-between">
                <div className="w-fit h-fit ">
                  <button
                    onClick={() => handleSelectedFood(item)}
                    className=" border border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500  w-fit h-fit py-2 px-4 rounded-full"
                  >
                    <ShoppingBagIcon />
                  </button>
                </div>
                <div className=" border border-orange-500 w-fit h-fit py-2 px-4 cursor-default text-orange-600 rounded-full">
                  {item.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;

import { useNavigate } from "react-router-dom";
import { useFood } from "./FoodContext";
import toast, { Toaster } from "react-hot-toast";
import { useFirebase } from "../Firebase/Firebase";

const Cart = () => {
  const {
    selectedFood,
    removeAllSelectedFood,
    removeSelectedFood,
    totalAmount,
    handleSelectedFood,
  } = useFood();

  const { placeOrder, isLoggedIn } = useFirebase();
  const navigate = useNavigate();

  // console.log(selectedFood);

  const handleOrder = async () => {
    //"AbotKcPPI4kqoxVTbL36"
    const result = await placeOrder()
      .then(() => {
        toast.success("Order Placed");

        setTimeout(() => {
          navigate("/");
          removeAllSelectedFood();
        }, 2000);
      })
      .catch((error) => console.log(error));

    // console.log("result of handleOrder,", result);

    // removeSelectedFood(...selectedFood);
    // console.log(selectedFood);
  };
  return isLoggedIn?(selectedFood.length === 0 ? (
    <h1 className="text-center text-5xl font-bold font-mono text-orange-500">
      <span className="text-6xl text-red-700">Oops!</span>
      <br />
      No item in Cart.
      <br />
      <span className="text-9xl">😿</span>
      <br />
      <span className="text-4xl">Continue Shopping 🍔 </span>
    </h1>
  ) : (
    <div className="md:grid md:grid-cols-2 bg-gray-200">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 4000 }}
      />
      <div className="m-2 p-2">
        <table className="m-4 p-2 table-auto">
          <thead>
            <tr className="text-xl font-semibold">
              <th className="p-3 text-center">Cart Items</th>
              <th className="p-3 text-center">Quantity</th>
              <th className="p-3 text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedFood.map((food) => (
              <tr
                key={food.id}
                className="sm:h-max h-[100px] m-2 p-2 shadow-lg rounded hover:scale-105 duration-300"
              >
                <td className="p-3 w-1/2">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-[300px] h-[200px] hidden sm:flex object-cover rounded"
                  />
                  <div className="">
                    <p className="text-xl font-semibold text-center">
                      {food.name}
                    </p>
                  </div>
                </td>
                <td className="text-right p-3">
                  <div className="text-center text-2xl font-semibold">
                    <button onClick={() => removeSelectedFood(food)}>-</button>
                    <span>{food.quantity}</span>
                    <button onClick={() => handleSelectedFood(food)}>+</button>
                  </div>
                </td>
                <td className="text-right p-3">
                  <div className="text-center text-2xl font-semibold">
                    {food.price}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-hidden">
        <div className="mx-auto rounded-lg text-center bg-gray-300 shadow-lg">
          <h1 className="text-4xl font-mono font-semibold">Total Price</h1>
          <div className=" flex flex-row justify-between">
            <span className="text-xl font-semibold font-mono  text-left p-2 m-2">
              {`Net Amount: $ ${totalAmount}`}
            </span>
            <button
              onClick={handleOrder}
              className=" bg-black text-white text-xl font-mono py-2 px-4 m-2 rounded-full items-center"
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )):(
    <h1 className="text-center md:text-5xl text-3xl font-bold font-mono text-orange-500 flex flex-col justify-center items-center h-[50vh]">
          <span className="md:text-6xl text-4xl text-red-700">Oops!</span>
          <br />
          Please Login using Google Credentials First.
          <br />
          <span className="md:text-9xl text-4xl">😿</span>
          {/* <br />
          <span className="text-4xl">Continue Shopping 🍔 </span> */}
        </h1>
  )
};

export default Cart;

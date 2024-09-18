import { useState, useEffect } from "react";
import { useFirebase } from "../Firebase/Firebase";

const OrderHistory = () => {
  const { fetchOrders, isLoggedIn } = useFirebase();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await fetchOrders();
        // console.log(orderData);

        const formattedOrders = orderData.docs.map((order) => {
          const data = order.data();
          return {
            id: order.id,
            orderDetails: data.orderDetails,
            orderTime: data.orderTime,
          };
        });
        formattedOrders.sort(
          (a, b) => new Date(b.orderTime) - new Date(a.orderTime)
        );
        setOrders(formattedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [fetchOrders]);

  return (
    <div className="container mx-auto mt-8 cursor-default h-screen">
      <h2 className="text-3xl font-mono font-bold text-center mb-4">
        Order History
      </h2>
      {isLoggedIn ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-mono font-semibold text-2xl  text-black uppercase ">
                Item
              </th>
              <th className="px-6 py-3 text-centre font-mono font-semibold text-2xl text-black uppercase">
                Quantity
              </th>
              <th className="px-6 py-3 text-left font-mono font-semibold text-2xl text-black uppercase ">
                Order Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4">
                  <ul>
                    {order.orderDetails.map((item) => (
                      <li key={item.id} className="mb-1 text-xl font-semibold">
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 ">
                  <ul>
                    {order.orderDetails.map((item) => (
                      <li
                        key={item.id}
                        className="mb-1 text-center text-xl font-semibold"
                      >
                        <span>{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 text-xl font-semibold">
                  {order.orderTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-center md:text-5xl text-3xl font-bold font-mono text-orange-500 flex flex-col justify-center items-center h-[50vh]">
          <span className="md:text-6xl text-4xl text-red-700">Oops!</span>
          <br />
          Please Login using Google Credentials First.
          <br />
          <span className="md:text-9xl text-4xl">😿</span>
          
        </h1>
      )}
    </div>
  );
};

export default OrderHistory;

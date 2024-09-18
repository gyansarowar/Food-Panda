import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
//Context for Food
const FoodContext = createContext();

export const useFood = () => useContext(FoodContext);

export const FoodProvider = ({ children }) => {
  const [selectedFood, setSelectedFood] = useState([]);

  //const collectionRef = collection(database, "users");
  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      setSelectedFood(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(selectedFood));
  }, [selectedFood]);

  const handleSelectedFood = (item) => {
    const itemIndex = selectedFood.findIndex((food) => {
      return food.id === item.id;
    });
    const newSelectedFood = [...selectedFood];
    if (itemIndex >= 0) {
      newSelectedFood[itemIndex] = {
        ...newSelectedFood[itemIndex],
        quantity: newSelectedFood[itemIndex].quantity + 1,
      };
    } else {
      newSelectedFood.push({ ...item, quantity: 1 });
    }
    setSelectedFood(newSelectedFood);
  };

  
  const removeSelectedFood = (item) => {
    const itemIndex = selectedFood.findIndex((food) => {
      return food.id === item.id;
    });
    const newSelectedFood = [...selectedFood];
    if (itemIndex >= 0 && newSelectedFood[itemIndex].quantity > 1) {
      newSelectedFood[itemIndex] = {
        ...newSelectedFood[itemIndex],
        quantity: newSelectedFood[itemIndex].quantity - 1,
      };
      setSelectedFood(newSelectedFood);
    } else {
      const filteredFood = newSelectedFood.filter(
        (food) => food.id !== item.id
      );
      setSelectedFood(filteredFood);
    }
  };

  

  const removeAllSelectedFood = () => {                                                 
    return setSelectedFood([]);
  };

  const totalAmount = selectedFood.reduce((prev, { price, quantity }) => {
    return prev + price.length * quantity;
  }, 0);

  return (
    <FoodContext.Provider
      value={{
        selectedFood,
        handleSelectedFood,
        removeSelectedFood,
        removeAllSelectedFood,
        totalAmount,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

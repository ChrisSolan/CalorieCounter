//This Context file will allow all the components to use the states and functions below
    //Makes it easy to track total calories and macros from various pages
import { useState, createContext, useContext } from "react";

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    
    const [consumedItems, setConsumedItems] = useState([]);
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);

    const addFoodItem = (foodItem) => {
        //takes a state as an arugment (prevItems in this case), then spreads it into a new state or array and appends the foodItem at the end
        setConsumedItems((consumed) => [...consumed, foodItem]); //might need to be curly braces instead of brackets
        setCalories((calories) => calories + foodItem.calories);
        setCarbs((carbs) => [carbs + foodItem.macros.carbs]);
        setProtein((protein) => [protein + foodItem.macros.protein]);
        setFat((fat) => [fat + foodItem.macros.fat]);

    }
    return (
        <FoodContext.Provider value={{consumedItems, calories, carbs, protein, fat, addFoodItem}}>
            {children}
        </FoodContext.Provider>
    );
};

export const useFoodContext = () => useContext(FoodContext);
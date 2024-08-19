import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //lets us navigate to where we specify


export const Home = () => { //maybe have a setCategory state var for knowing if a food is for breakfast or other...
    const navigate = useNavigate();
    const [foodItems, setFoodItems] = useState([]); //holds the state of an array of FoodItems
    const [addedFoodItems, setAddedFoodItems] = useState([]);

    const onClick = async (event) => {
        event.preventDefault(); //stops the page from refreshing when onClick is executed
        navigate('/showFood');
    }


    return (
        <div>
            <h1>Calories: </h1>
            <p>Carbs: </p>          
            <p>Protein: </p>
            <p>Fat: </p>
            <h3>Breakfast</h3>
            <button onClick={onClick}>Add Food</button>
            <h3>Lunch</h3>
            <button onClick={onClick}>Add Food</button>
            <h3>Dinner</h3>
            <button onClick={onClick}>Add Food</button>
        </div>
    )

}
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //lets us navigate to where we specify
import { useFoodContext } from '../Contexts/FoodContext';


export const Home = () => { //maybe have a setCategory state var for knowing if a food is for breakfast or other...
    const navigate = useNavigate();
    //the state names have to be the same as the exported states from useAddFoodItem
    const { calories, carbs, protein, fat, setCalories, setCarbs, setProtein, setFat } = useFoodContext();

    const handleCalories = () => {
        setCalories(0);
        setCarbs(0);
        setProtein(0);
        setFat(0);
    }
    return (
        <div>
            <button onClick={handleCalories}>Finish Day</button>
            <h1>Calories: {calories} cal</h1>
            <p>Carbs: {carbs}g</p>          
            <p>Protein: {protein}g</p>
            <p>Fat: {fat}g</p>
            <h3>Breakfast</h3>
            <button onClick={() => navigate('/showFood')}>Add Food</button>
            <h3>Lunch</h3>
            <button onClick={() => navigate('/showFood')}>Add Food</button>
            <h3>Dinner</h3>
            <button onClick={() => navigate('/showFood')}>Add Food</button>
        </div>
    )

};
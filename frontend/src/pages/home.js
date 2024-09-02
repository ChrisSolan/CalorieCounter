import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //lets us navigate to where we specify
import { useFoodContext } from '../Contexts/FoodContext';


export const Home = () => { //maybe have a setCategory state var for knowing if a food is for breakfast or other...
    const navigate = useNavigate();
    //the state names have to be the same as the exported states from useAddFoodItem
    const { calories, carbs, protein, fat, setCalories, setCarbs, setProtein, setFat, setMeal, consumedItems, setConsumedItems } = useFoodContext();
    const breakfastItems = consumedItems.filter(foodItem => foodItem.meal === 'Breakfast');

    const handleCalorieReset = () => {
        setCalories(0);
        setCarbs(0);
        setProtein(0);
        setFat(0);
        setConsumedItems([]);
    }

    const handleMeal = (meal) => {
        setMeal(meal);
        navigate('/showFood');
    }


    return (
        <div>
            <button onClick={handleCalorieReset}>Finish Day</button>
            <h1>Calories: {calories} cal</h1>
            <p>Carbs: {carbs}g</p>          
            <p>Protein: {protein}g</p>
            <p>Fat: {fat}g</p>
            <h3>Breakfast</h3>
            <ul>
                {breakfastItems.map(foodItem => (
                    <li key={foodItem._id}>{foodItem.name} - {foodItem.calories} cal</li>
                ))}
            </ul>
            <button onClick={() => handleMeal('Breakfast')}>Add Food</button>
            <h3>Lunch</h3>
            <button onClick={() => handleMeal('Lunch')}>Add Food</button>
            <h3>Dinner</h3>
            <button onClick={() => handleMeal('Dinner')}>Add Food</button>
        </div>
    )

};
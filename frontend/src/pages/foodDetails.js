import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //lets us navigate to where we specify
import { useParams } from 'react-router-dom';

export const FoodDetails = () => { //maybe have a setCategory state var for knowing if a food is for breakfast or other...
    const navigate = useNavigate();
    const [foodItem, setFoodItem] = useState(); //holds the state of an array of FoodItems
    const [addedFoodItems, setAddedFoodItems] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await axios.get(`http://localhost:3010/foodItems/${id}`);
                setFoodItem(response.data);
            } catch (err) {
                console.log(err);
            }
        };
 
        fetchFoodItems();
    }, [id]);

    if(!foodItem) return <p>Loading...</p>

    return (
        <div className = "foodDetails">
            <h2>{foodItem.name}</h2>
            <p>{foodItem.servingSize.size} {foodItem.servingSize.unit}</p>
            <p>{foodItem.calories} Cal</p>
            <p>Carbs: {foodItem.macros.carbs}g</p>
            <p>Fat: {foodItem.macros.fat}g</p>
            <p>Protein: {foodItem.macros.protein}g</p>
            <img src={foodItem.imageUrl} alt= {foodItem.name}/>
        </div>
    )

}
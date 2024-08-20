import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ShowFood = () => {
    const navigate = useNavigate();
    const [foodItems, setFoodItems] = useState([]); //holds the state of an array of FoodItems
    const [addedFoodItems, setAddedFoodItems] = useState([]);

    //Anything in this hook will happen when the page is rendered and loaded
    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await axios.get('http://localhost:3010/foodItems');
                setFoodItems(response.data);
            } catch (err) {
                console.log(err);
            }
        };
 
        fetchFoodItems();
    }, []);
    
    return (
        <div className = "showFood">
            <h1>Food Items</h1>

            <ul>
            {foodItems.map((foodItem) => (
                    <li key={foodItem._id} onClick={() => navigate(`/showFood/${foodItem._id}`)}>
                        <h2>{foodItem.name}</h2>
                        <p>{foodItem.servingSize.size} {foodItem.servingSize.unit}</p>
                        <p>{foodItem.calories} Cal</p>
                        <img src={foodItem.imageUrl} alt= {foodItem.name}/>
                    </li>
                ))}
            </ul>
        </div>
    )
};
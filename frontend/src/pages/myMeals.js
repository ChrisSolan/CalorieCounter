import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";


export const MyMeals = () => {

    const [createdFoodItems, setCreatedFoodItems] = useState([]);
    const userID = window.localStorage.getItem("userID");
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchCreatedfoodItems = async () => {
            try {
                const response = await axios.get(`http://localhost:3010/foodItems/createdfoodItems/${userID}`);
                setCreatedFoodItems(response.data.createdFoodItems);
            } catch (err) {
                console.log(err);
            }
        } 

        fetchCreatedfoodItems();

    }, [userID]);

    const onDelete = async(foodItem) => {
        try {
            await axios.delete(`http://localhost:3010/foodItems/${foodItem._id}`);
            alert(`Food Item (${foodItem.name}) deleted!`);
            setCreatedFoodItems( (createdFoodItems) => {
                createdFoodItems.filter((item) => item._id !== foodItem._id); //return a new createdFoodItems state without the deleted foodItem
            });

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="myMeals">
            <h1>My Meals</h1>
            <ul>
            {createdFoodItems && createdFoodItems.length > 0 ? (
                    createdFoodItems.map((foodItem) => (
                        <li key={foodItem._id}>
                            <h2>{foodItem.name}</h2>
                            <p>{foodItem.servingSize.size} {foodItem.servingSize.unit}</p>
                            <p>{foodItem.calories} Cal</p>
                            <img src={foodItem.imageUrl} alt= {foodItem.name}/>
                            <button onClick={() => onDelete(foodItem)}>Delete this food item</button>
                        </li>
                    ))
                ) : (
                    <p>No Meals Found</p>
                )}

            </ul>
        </div>
    )
}
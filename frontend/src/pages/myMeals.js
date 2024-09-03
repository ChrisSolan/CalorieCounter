import { useState, useEffect } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"


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

    }, []);

    return (
        <div className="myMeals">
            <h1>My Meals</h1>
            <ul>
                {createdFoodItems.map((foodItem) => (
                    <li key={foodItem._id}>
                        <h2>{foodItem.name}</h2>
                        <p>{foodItem.servingSize.size} {foodItem.servingSize.unit}</p>
                        <p>{foodItem.calories} Cal</p>
                        <img src={foodItem.imageUrl} alt= {foodItem.name}/>
                        <button onClick={() => navigate(`/showFood/${foodItem._id}`)}> </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
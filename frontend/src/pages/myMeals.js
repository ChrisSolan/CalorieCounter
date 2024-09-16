import { useState, useEffect } from "react"
import axios from "axios"

let urlLink = null;

if (process.env.REACT_APP_DOCKER_BUILD === 'true') {
    urlLink = process.env.REACT_APP_API_URL;
} else {
    urlLink = process.env.REACT_APP_LOCAL_URL;
}

export const MyMeals = () => {

    const [createdFoodItems, setCreatedFoodItems] = useState([]);
    const userID = window.localStorage.getItem("userID");
    
    useEffect(() => {
        const fetchCreatedfoodItems = async () => {
            try {
                const response = await axios.get(`${urlLink}foodItems/createdfoodItems/${userID}`);
                setCreatedFoodItems(response.data.createdFoodItems);
            } catch (err) {
                console.log(err);
            }
        } 

        fetchCreatedfoodItems();

    }, [userID]);

    const onDelete = async(foodItem) => {
        try {
            await axios.delete(`${urlLink}foodItems/${foodItem._id}`);
            alert(`Food Item (${foodItem.name}) deleted!`);
            setCreatedFoodItems( (createdFoodItems) => {
                createdFoodItems.filter((item) => item._id !== foodItem._id); //return a new createdFoodItems state without the deleted foodItem
            });

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="myMeals text-center bg-[#ACD7EC] min-h-screen items-center justify-center py-[15px]">
            <h1>My Meals</h1>
            <ul className='flex flex-col items-center my-[15px]'>
            {createdFoodItems && createdFoodItems.length > 0 ? (
                    createdFoodItems.map((foodItem) => (
                        <li key={foodItem._id} className='flex text-left items-center space-x-4'>
                            <img src={foodItem.imageUrl} alt= {foodItem.name} className=' h-[150px] w-[150px] rounded-full object-cover'/>
                            <h2>{foodItem.name}</h2>
                            <p>{foodItem.servingSize.size} {foodItem.servingSize.unit}</p>
                            <p>{foodItem.calories} Cal</p>
                            <button className='rounded-full bg-[#F1AB86] px-[18px] py-[6px] font-medium' onClick={() => onDelete(foodItem)}>Delete this food item</button>
                        </li>
                    ))
                ) : (
                    <p>No Meals Found</p>
                )}

            </ul>
        </div>
    )
}
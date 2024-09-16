import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //lets us navigate to where we specify
import { useParams } from 'react-router-dom';
import { useFoodContext } from '../Contexts/FoodContext';

let urlLink = null;

if (process.env.REACT_APP_DOCKER_BUILD === 'true') {
    urlLink = process.env.REACT_APP_API_URL;
    console.log(`urlLink is ${urlLink}`);
} else {
    urlLink = process.env.REACT_APP_LOCAL_URL;
    console.log("ERROR: DIDNT GET DOCKER BUILD");
}

export const FoodDetails = () => { //maybe have a setCategory state var for knowing if a food is for breakfast or other...
    const navigate = useNavigate();
    const [foodItem, setFoodItem] = useState(); //holds the state of an array of FoodItems
    const { id } = useParams();
    const {addFoodItem} = useFoodContext();
    const {meal} = useFoodContext();

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await axios.get(`${urlLink}foodItems/${id}`);
                setFoodItem(response.data);
            } catch (err) {
                console.log(err);
            }
        };
 
        fetchFoodItems();
    }, [id]);

    const handleAddFood = (foodItem) => {
        addFoodItem(foodItem, meal);
        navigate('/');
    }

    if(!foodItem) return <p>Loading...</p>

    return (
        <div className = "foodDetails bg-[#ACD7EC] min-h-screen">
            <div className='flex items-center justify-center space-x-4 text-left py-[15px]'>
            <img src={foodItem.imageUrl} alt= {foodItem.name} className=' h-[150px] w-[150px] rounded-full object-cover'/>
            <h2>{foodItem.name}</h2>
            <p>{foodItem.servingSize.size} {foodItem.servingSize.unit}</p>
            <p>{foodItem.calories} Cal</p>
            <p>Carbs: {foodItem.macros.carbs}g</p>
            <p>Fat: {foodItem.macros.fat}g</p>
            <p>Protein: {foodItem.macros.protein}g</p>
            <button className="rounded-full bg-[#00798C] font-medium px-[18px] py-[6px] text-white"  onClick={(event) => handleAddFood(foodItem, event)}>+Add Food</button>
            </div>
          
        </div>
    )

}
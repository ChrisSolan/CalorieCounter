import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFoodContext } from '../Contexts/FoodContext';
import { useCookies } from 'react-cookie';

let urlLink = null;

if (process.env.REACT_APP_DOCKER_BUILD === 'true') {
    urlLink = process.env.REACT_APP_API_URL;
} else {
    urlLink = process.env.REACT_APP_LOCAL_URL;
}

export const ShowFood = () => {
    const navigate = useNavigate();
    const [foodItems, setFoodItems] = useState([]); //holds the state of an array of FoodItems
    const [query, setQuery] = useState(""); //tracks the state of our qeury or search
    const {addFoodItem} = useFoodContext();
    const {meal} = useFoodContext();
    const [cookies, ] = useCookies(['access_token']);

    //Anything in this hook will happen when the page is rendered and loaded
    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await axios.get(`${urlLink}foodItems`);
                setFoodItems(response.data);
            } catch (err) {
                console.log(err);
            }
        };
 
        fetchFoodItems(); 
    }, []);
    
    const handleAddFood = (foodItem, event) => {
        //stops the feature of clicking on a foodItem to see more information if the button is clicked
        event.stopPropagation(); 
        addFoodItem(foodItem, meal);
        navigate('/');
    }

    const filteredItems = useMemo(() => {
        return foodItems.filter((foodItem) => {
            return foodItem.name.toLowerCase().includes(query.toLowerCase());
        }, [foodItems, query]);
    });

    

    return (
        <div className = "showFood bg-[#ACD7EC] min-h-screen text-center py-[15px]">
            <h1>All Food Items <button className='rounded-full bg-[#F1AB86] px-[18px] py-[6px] font-medium' onClick={() => navigate('/createFood')}>Create Food Item</button></h1>
            {cookies.access_token ? (
            <button className='rounded-full bg-[#F1AB86] px-[18px] py-[6px] font-medium' onClick={() => navigate('/myMeals')}>my Meals</button>
            ): (
                <h3>Login to access My Meals!</h3>
            )}
            <br/>
            <label htmlFor='search'>Search Food Items</label>
            <input type='search' id='search' className='border-2 border-black mx-[5px]' value={query} onChange={event => setQuery(event.target.value)}/>
           

            <ul className='flex flex-col items-center my-[15px]'>
            {filteredItems.map((foodItem) => (
                    <li key={foodItem._id} className='my-[15px] flex items-center space-x-4 text-left' onClick={() => navigate(`/showFood/${foodItem._id}`)}>
                        <img src={foodItem.imageUrl} alt= {foodItem.name} className=' h-[150px] w-[150px] rounded-full object-cover'/>
                        <h2>{foodItem.name}</h2>
                        <p>{foodItem.servingSize.size} {foodItem.servingSize.unit}</p>
                        <p>{foodItem.calories} Cal</p>
                        <h3>Click for more info...</h3>
                        <button className="rounded-full bg-[#00798C] font-medium px-[18px] py-[6px] text-white" onClick={(event) => handleAddFood(foodItem, event)}>+Add Food</button>
                    </li>
                ))}
            </ul>
        </div>
    )
};
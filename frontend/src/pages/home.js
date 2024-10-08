import { useNavigate } from 'react-router-dom'; //lets us navigate to where we specify
import { useFoodContext } from '../Contexts/FoodContext';
import { CircularProgress } from '@mui/joy';

export const Home = () => { //maybe have a setCategory state var for knowing if a food is for breakfast or other...
    const navigate = useNavigate();
    //the state names have to be the same as the exported states from useAddFoodItem
    const { calories, carbs, protein, fat, setCalories, setCarbs, setProtein, setFat, setMeal, consumedItems, setConsumedItems, removeFoodItem } = useFoodContext();
    
    const breakfastItems = consumedItems.filter(foodItem => foodItem.meal === 'Breakfast');
    const lunchItems = consumedItems.filter(foodItem => foodItem.meal === 'Lunch');
    const dinnerItems = consumedItems.filter(foodItem => foodItem.meal === 'Dinner');
    
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
        <div className='text-center bg-[#ACD7EC] min-h-screen items-center justify-center py-[15px]'>
            <button className='rounded-full bg-[#F1AB86] px-[18px] py-[6px] font-medium mb-[15px]' onClick={handleCalorieReset}>Finish Day</button>
            <div className="flex justify-center items-center">
                <CircularProgress 
                    value={ calories / 2000 * 100 }
                    determinate
                    size='lg'
                >
                {calories} cal
                </CircularProgress>
            </div>
    
            <p>Carbs: {carbs}g</p>          
            <p>Protein: {protein}g</p>
            <p>Fat: {fat}g</p>
            <br/>
            <div>
                <h3>Breakfast</h3>
                <button className="rounded-full bg-[#00798C] font-medium px-[18px] py-[6px] text-white" onClick={() => handleMeal('Breakfast')}>+Add Food</button>
                <ul>
                    {breakfastItems.map(foodItem => (
                        <li key={foodItem._id} className='my-[5px]'>{foodItem.name} - {foodItem.calories} cal 
                        <button className='rounded-full bg-[#F1AB86] px-[12px] py-[3px] font-medium mx-[10px]' onClick={() => removeFoodItem(foodItem, foodItem.uniqueID)}>Remove Item</button>
                        </li>
                    ))}
                </ul>

                <h3>Lunch</h3>
                <button className="rounded-full bg-[#00798C] font-medium px-[18px] py-[6px] text-white" onClick={() => handleMeal('Lunch')}>+Add Food</button>
                <ul>
                    {lunchItems.map(foodItem => (
                        <li key={foodItem._id} className='my-[5px]'>{foodItem.name} - {foodItem.calories} cal 
                        <button className='rounded-full bg-[#F1AB86] px-[12px] py-[3px] font-medium mx-[10px]' onClick={() => removeFoodItem(foodItem, foodItem.uniqueID)}>Remove Item</button>
                        </li>
                    ))}
                </ul>

                <h3>Dinner</h3>
                <button className="rounded-full bg-[#00798C] font-medium px-[18px] py-[6px] text-white" onClick={() => handleMeal('Dinner')}>+Add Food</button>
                <ul>
                    {dinnerItems.map(foodItem => (
                        <li key={foodItem._id} className='my-[5px]'>{foodItem.name} - {foodItem.calories} cal 
                        <button className='rounded-full bg-[#F1AB86] px-[12px] py-[3px] font-medium mx-[10px]' onClick={() => removeFoodItem(foodItem, foodItem.uniqueID)}>Remove Item</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

};
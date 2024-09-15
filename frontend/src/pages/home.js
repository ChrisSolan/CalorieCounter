import { useNavigate } from 'react-router-dom'; //lets us navigate to where we specify
import { useFoodContext } from '../Contexts/FoodContext';

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
            <button className='rounded-full bg-[#F1AB86] px-[18px] py-[6px] font-medium' onClick={handleCalorieReset}>Finish Day</button>
            <h1>Calories: {calories} cal</h1>
           
      

            <p>Carbs: {carbs}g</p>          
            <p>Protein: {protein}g</p>
            <p>Fat: {fat}g</p>
            <h3>Breakfast</h3>
            <ul>
                {breakfastItems.map(foodItem => (
                    <li key={foodItem._id} className='my-[5px]'>{foodItem.name} - {foodItem.calories} cal <button className='rounded-full bg-[#F1AB86] px-[12px] py-[3px] font-medium' onClick={() => removeFoodItem(foodItem, 'Breakfast')}>Remove Item</button></li>
                ))}
            </ul>
            <button className="rounded-full bg-[#00798C] font-medium px-[18px] py-[6px] text-white" onClick={() => handleMeal('Breakfast')}>+Add Food</button>

            <h3>Lunch</h3>
            <ul>
                {lunchItems.map(foodItem => (
                    <li key={foodItem._id}>{foodItem.name} - {foodItem.calories} cal <button className='rounded-full bg-[#F1AB86] px-[18px] py-[6px] font-medium' onClick={() => removeFoodItem(foodItem, 'Lunch')}>Remove Item</button></li>
                ))}
            </ul>
            <button className="rounded-full bg-[#00798C] font-medium px-[18px] py-[6px] text-white" onClick={() => handleMeal('Breakfast')}>+Add Food</button>

            <h3>Dinner</h3>
            <ul>
                {dinnerItems.map(foodItem => (
                    <li key={foodItem._id}>{foodItem.name} - {foodItem.calories} cal <button className='rounded-full bg-[#F1AB86] px-[18px] py-[6px] font-medium' onClick={() => removeFoodItem(foodItem, 'Dinner')}>Remove Item</button></li>
                ))}
            </ul>
            <button className="rounded-full bg-[#00798C] font-medium px-[18px] py-[6px] text-white" onClick={() => handleMeal('Breakfast')}>+Add Food</button>
        </div>
    )

};
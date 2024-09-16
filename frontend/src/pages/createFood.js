import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

let urlLink = null;

if (process.env.REACT_APP_DOCKER_BUILD === 'true') {
    urlLink = process.env.REACT_APP_API_URL;
} else {
    urlLink = process.env.REACT_APP_LOCAL_URL;
}

export const CreateFood = () => {

    const navigate = useNavigate();
    const userID = window.localStorage.getItem("userID");
    const [cookies, ] = useCookies(['access_token']);
    const [error, setError] = useState(''); // state for handling validation errors for creating the food item
    const [foodItem, setFoodItem] = useState({ 
        
        name : '',
        servingSize: {
            size: 0,
            unit: "",
        },
        calories: 0,
        macros: {
            carbs: 0,
            fat: 0,
            protein: 0
        },
        imageUrl: "",
        userOwner: userID
    });

    const handleChange = (event) => { //the event happens whenever the input field is changed
        const {name, value} = event.target; //'name' refers to the name attribute from the input tag, value is whatever is in the input field
        //make the name attribute in the input tags the name of the JSON properties
        setFoodItem({...foodItem, [name]: value}); //updates the property in foodItem that matches the "name" of the input vield with the "value"
    }

    const validateForm = () => {
        if (foodItem.name.length > 32) {
            setError('Name cannot exceed 32 characters.');
            return false;
        }

        //isNaN returns true if the input is not a number
        if (isNaN(foodItem.servingSize.size) || foodItem.servingSize.size <= 0) {
            setError('Serving size must be a positive number.');
            return false;
        }

        if (isNaN(foodItem.calories) || foodItem.calories <= 0) {
            setError('Calories must be a positive number.');
            return false;
        }

        if (isNaN(foodItem.macros.carbs) || foodItem.macros.carbs <= 0) {
            setError('Carbs must be a positive number.');
            return false;
        }

        if (isNaN(foodItem.macros.protein) || foodItem.macros.protein <= 0) {
            setError('Protein must be a positive number.');
            return false;
        }

        if (isNaN(foodItem.macros.fat) || foodItem.macros.fat <= 0) {
            setError('Fat must be a positive number.');
            return false;
        }
        
        return true;
    };

    const onSubmit = async(event) => { 
        event.preventDefault();
        setError('');

        if (!validateForm()) return; //if there is an error, stop before submitting to the database

        try {
            const response = await axios.post(`${urlLink}foodItems/`, foodItem, 
                { headers: { authorization: cookies.access_token} }
            );

            const createdFoodItem = response.data;
            await axios.put(`${urlLink}foodItems/`, {
                    foodItemID: createdFoodItem._id,
                    userID
                },
                { headers: { authorization: cookies.access_token} }
            );
            alert("Food Item Created and added to your meals!");
            navigate("/showFood"); //redirect back to the show food page
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className = "createFood text-center bg-[#ACD7EC] min-h-screen py-[15px]">
            <h2>Create Food Item</h2>
            {cookies.access_token ? (
             <form onSubmit={onSubmit} className='flex flex-col items-center justify-center gap-4 my-[15px]'>
              {error && <p className="text-red-600">{error}</p>}

                <div className='flex items-center space-x-[10px]'>
                    <label htmlFor='name'>Name: </label>
                    <input type='text' id='name' name='name' className='border-2 border-black p-1 w-full max-w-md' maxLength={32} minLength={8} title='Name must be between 8 and 32 characters' onChange={handleChange}/>
                </div>

                <div className='flex items-center space-x-[10px]'>
                    <label htmlFor='size'>Serving Size: </label>
                    <input type='number' id='size' name='servingSize.size' placeholder="size" className='border-2 border-black p-1 w-full max-w-md' required onChange={handleChange}/>
                    <input type='text' id='unit' name='servingSize.unit' placeholder='unit' className='border-2 border-black p-1 w-full max-w-md' maxLength={32} required onChange={handleChange}/>
                </div>

                <div className='flex items-center space-x-[10px]'>
                    <label htmlFor='calories'>Calories: </label>
                    <input type='number' id='calories' name='calories' className='border-2 border-black p-2 w-full max-w-md' onChange={handleChange}/>
                </div>

                <div className='flex items-center space-x-[10px]'>
                    <label htmlFor='carbs'>Carbs: </label>
                    <input type='number' id='carbs' name='macros.carbs' className='border-2 border-black p-2 w-full max-w-md' onChange={handleChange}/>
                </div>

                <div className='flex items-center space-x-[10px]'>
                    <label htmlFor='fat'>Fat: </label>
                    <input type='number' id='fat' name='macros.fat' className='border-2 border-black p-2 w-full max-w-md' onChange={handleChange}/>
                </div>

                <div className='flex items-center space-x-[10px]'>
                    <label htmlFor='protein'>Protein: </label>
                    <input type='number' id='protein' name='macros.protein' className='border-2 border-black p-2 w-full max-w-md' onChange={handleChange}/>
                </div>
                <div className='flex items-center space-x-[10px]'>
                    <label htmlFor='imageUrl'>imageUrl: </label>
                    <input type='text' id='imageUrl' name='imageUrl' className='border-2 border-black p-2 w-full max-w-md' onChange={handleChange}/>
                </div>

                <button type='submit' className='rounded-full bg-[#F1AB86] px-[18px] py-[6px] font-medium'>Create Food Item</button>
            </form>

            ): (
               <h3>Login to create a food item</h3>
            )}
           
        </div>
    )
};
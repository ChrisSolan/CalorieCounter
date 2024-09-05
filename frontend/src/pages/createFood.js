import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const CreateFood = () => {

    const navigate = useNavigate();
    const userID = window.localStorage.getItem("userID");
    const [createdFoodItems, setCreatedFoodItems] = useState([]);
    const [cookies, setCookies] = useCookies(['access_token']);
    const [foodItem, setFoodItem] = useState({ //might need to add a property to store the user who owns the created foodItem in both here and the backend
        
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

    const onSubmit = async(event) => { 
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3010/foodItems/', foodItem, 
                { headers: { authorization: cookies.access_token} }
            );

            const createdFoodItem = response.data;
            await axios.put('http://localhost:3010/foodItems/', {
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
        <div className = "createFood">
            <h2>Create Food Item</h2>
            {cookies.access_token ? (
             <form onSubmit={onSubmit}>
                <label htmlFor='name'>Name: </label>
                <input type='text' id='name' name='name' onChange={handleChange}/>

                <label htmlFor='size'>Serving Size: </label>
                <input type='number' id='size' name='servingSize.size' placeholder="size" onChange={handleChange}/>
                <input type='text' id='unit' name='servingSize.unit' placeholder='unit' onChange={handleChange}/>

                <label htmlFor='calories'>Calories: </label>
                <input type='number' id='calories' name='calories' onChange={handleChange}/>

                <label htmlFor='carbs'>Carbs: </label>
                <input type='number' id='carbs' name='macros.carbs' onChange={handleChange}/>

                <label htmlFor='fat'>Fat: </label>
                <input type='number' id='fat' name='macros.fat' onChange={handleChange}/>

                <label htmlFor='protein'>Protein: </label>
                <input type='number' id='protein' name='macros.protein' onChange={handleChange}/>

                
                <label htmlFor='imageUrl'>imageUrl: </label>
                <input type='text' id='imageUrl' name='imageUrl' onChange={handleChange}/>

                <button type='submit'>Create Food Item</button>
            </form>

            ): (
               <h3>Login to create a food item</h3>
            )}
           
        </div>
    )
};
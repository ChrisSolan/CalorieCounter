import {useState} from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';


export const Auth = () => {
    return (
        <div className='auth'>
            <Login/>
            <Register/>
        </div>
    );
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cookies , setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const onSubmit = async(event) => {
        event.preventDefault(); //allows us to submit the form without reloading the whole page

        try {
            const response = await axios.post('http://localhost:3010/auth/login', {
                username,
                password,
            });

            setCookies("access_token", response.data.token); //token stored in cookies
            window.localStorage.setItem("userID", response.data.userID); //userID stored in local storage
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <div className='auth-container'>
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <div className='form-group'>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' id='username' value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password: </label>
                    <input type='text' id='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async(event) => {
        event.preventDefault(); //allows us to submit the form without reloading the whole page

        try {
            await axios.post('http://localhost:3010/auth/register', {
                username,
                password,
            });
            alert("Registration Complete!");
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <div className='auth-container'>
            <form onSubmit={onSubmit}>
                <h2>Register</h2>
                <div className='form-group'>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' id='username' value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password: </label>
                    <input type='text' id='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
    );
};
import {useState} from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

let urlLink = null;

if (process.env.REACT_APP_DOCKER_BUILD === 'true') {
    urlLink = process.env.REACT_APP_API_URL;
    console.log(`urlLink is ${urlLink}`);
} else {
    urlLink = process.env.REACT_APP_LOCAL_URL;
    console.log("ERROR: DIDNT GET DOCKER BUILD");
}

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
    const [, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const onSubmit = async(event) => {
        event.preventDefault(); //allows us to submit the form without reloading the whole page

        try {
            const response = await axios.post(`${urlLink}auth/login`, {
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
        <div className='auth-container text-center bg-[#ACD7EC] items-center justify-center py-[15px]'>
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <div className='form-group py-[3px]'>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' id='username' className='border-2 border-black' value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className='form-group  pb-[10px]'>
                    <label htmlFor='password'>Password: </label>
                    <input type='text' id='password' className='border-2 border-black' value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button className='rounded-full bg-[#00798C] font-medium px-[18px] py-[6px] text-white' type='submit'>Login</button>
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
            await axios.post(`${urlLink}/auth/register`, {
                username,
                password,
            });
            alert("Registration Complete!");
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <div className='auth-container text-center bg-[#ACD7EC] min-h-screen justify-center'>
            <form onSubmit={onSubmit}>
                <h2>Register</h2>
                <div className='form-group py-[3px]'>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' id='username' className='border-2 border-black' value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className='form-group  pb-[10px]'>
                    <label htmlFor='password'>Password: </label>
                    <input type='text' id='password' className='border-2 border-black' value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button className='rounded-full bg-[#00798C] font-medium px-[18px] py-[6px] text-white' type='submit'>Register</button>
            </form>
        </div>
    );
};
import {useState} from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';


export const Auth = () => {
    return (
        <div className='auth'>

        </div>
    );
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ , setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    
};
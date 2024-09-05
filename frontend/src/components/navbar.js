import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

export const Navbar = () => {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(['access_token']);
    const logout = () => {
        setCookies("access_token", ""); //clear and set the cookies to empty
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }

    return <div className='navbar'>
        <Link to= "/">Home</Link>
        {!cookies.access_token ? (
            <Link to='/auth'>Login/Register</Link>
            ): (
                <button onClick={logout}>Logout</button>
            )}
    </div>
}
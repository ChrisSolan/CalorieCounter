import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

export const Navbar = () => {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(['access_token']);
    const logout = () => {
        setCookies("access_token", ""); //clear and set the cookies to empty
        navigate("/auth");
    }

    return <div className='navbar'>
        <Link to= "/">Home</Link>
        <Link to= "/auth">Login/Register</Link>
        {<button onClick={logout} className='logoutBtn'>Logout</button>}
    </div>
}
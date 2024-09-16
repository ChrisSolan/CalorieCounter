import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {ReactComponent as LogoutIcon} from '../assets/log-out.svg';

export const Navbar = () => {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(['access_token']);
    const logout = () => {
        setCookies("access_token", ""); //clear and set the cookies to empty
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }

    return (
        <div className='bg-[#F7DBA7] text-black text-[20px] font-medium py-[10px] flex justify-center space-x-[15px]'>
            <Link to= "/" className=''>Home</Link>
            {!cookies.access_token ? (
                <Link to='/auth' className=''>Login/Register</Link>
                ): (
                    <button onClick={logout} className='flex items-center'>Logout <LogoutIcon width={25} height={25}/></button>
                )}
        </div>
    )
}
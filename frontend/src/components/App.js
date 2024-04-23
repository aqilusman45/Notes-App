
import {BrowserRouter,Routes,Route,Link, useNavigate,useLocation,} from 'react-router-dom'
import Signup from './Signup';
import LoginForm from './LoginForm';
import '../index.css'
import Home from './Home';
import { useEffect, useState } from 'react';
function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in when component mounts
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // !! converts token to a boolean
  }, []);

  useEffect(() => {
    // Listen for changes in the location to update the Navbar
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // !! converts token to a boolean
  }, [location]);

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Update state to reflect logged out status
    setIsLoggedIn(false);
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          My Notes App
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              {/* If user is logged in, display logout link */}
              <li>
                <button className="hover:text-gray-300" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* If user is not logged in, display login and signup links */}
              <li>
                <Link to="/login" className="hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-gray-300">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

function App() {
 
  return (<>
<BrowserRouter>
<Navbar/>
<Routes>
  <Route index element={<Home/>} />
  <Route path='/login' element={<LoginForm/>} />
  <Route path='/signup' element={<Signup/>} />

</Routes>
</BrowserRouter>
  </>

  );
}

export default App;

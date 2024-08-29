import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Navbar} from './components/navbar.js';
import {Home} from './pages/home.js';
import { Auth } from './pages/auth.js';
import { ShowFood } from './pages/showFood.js';
import { CreateFood } from './pages/createFood.js';
import { FoodDetails } from './pages/foodDetails.js';
import { FoodProvider } from './Contexts/FoodContext.js';

function App() {
  return (
    <FoodProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/showFood' element={<ShowFood/>}/>
            <Route path='/createFood' element={<CreateFood/>}/>
            <Route path='/showFood/:id' element={<FoodDetails/>}/>
          </Routes>
        </Router>
      </div>
    </FoodProvider>
  );
}

export default App;

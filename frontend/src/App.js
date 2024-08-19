import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Navbar} from './components/navbar.js';
import {Home} from './pages/home.js';
import { Auth } from './pages/auth.js';
import { ShowFood } from './pages/showFood.js';
import { CreateFood } from './pages/createFood.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/showFood' element={<ShowFood/>}/>
          <Route path='/createFood' element={<CreateFood/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

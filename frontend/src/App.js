import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TitlePage from './pages/TitlePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Generate from './pages/Generate';
import Recipes from './pages/Recipes'
import Instructions from './pages/Instructions'
import Unedible from './pages/unedible';
import Results from './pages/Results'
import './App.css'; //not needed

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<TitlePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/generate' element={<Generate />} />
          <Route path='/instructions' element={<Instructions />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/unedible' element={<Unedible />} />
          <Route path='/results' element={<Results />} />

        </Routes>
      </Router>
  );
}

export default App;

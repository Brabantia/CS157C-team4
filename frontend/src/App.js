import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TitlePage from './pages/TitlePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Generate from './pages/Generate';

import './App.css';

function App() {
    return (
        <Router>
          <Routes>
            <Route path="/" element={<TitlePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/generate' element={<Generate />} />
          </Routes>
        </Router>
    );
}

export default App;

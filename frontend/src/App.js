import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TitlePage from './pages/TitlePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Generate from './pages/Generate';

import './App.css';


function App() {
  useEffect(() => {
    fetch('/api') // proxy to our flask backend
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
    // maybe need tp import some data from flask to react to test Div out.

    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<TitlePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/generate' element={<Generate />} />
          </Routes>
        </Router>
        <div>
          <h1>Hello, React!</h1>
          <p>Data from Flask: {JSON.stringify(data)}</p>
          <div className="App">
            <RecipeForm />
          </div>
        </div>
      </div>
    );
}

export default App;

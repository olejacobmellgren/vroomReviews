import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Filterpage from './pages/Filterpage';
import Carpage from './pages/Carpage';
import Favoritepage from './pages/Favoritepage';
import Reviewpage from './pages/Reviewpage';

function App() {
  return (
    <>
      <div>
        <div className="App">
          <Routes>
            <Route path="/project2" element={<Homepage />} />
            <Route path="/project2/filtercars" element={<Filterpage />} />
            <Route path="/project2/carpage/:id" element={<Carpage />} />
            <Route path="/project2/favorites" element={<Favoritepage />} />
            <Route path="/project2/reviewedcars" element={<Reviewpage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

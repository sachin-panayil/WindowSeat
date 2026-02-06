import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
// import MapPage from './pages/MapPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        {/* <Route path="/map" element={<MapPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
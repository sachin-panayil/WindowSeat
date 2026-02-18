import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import SearchPage from './pages/SearchPage';
// import MapPage from './pages/MapPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        {/* <Route path="/map" element={<MapPage />} /> */}
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
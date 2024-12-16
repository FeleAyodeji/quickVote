import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import CategoryPage from './pages/CategoryPage';
// import ResultsPage from './pages/ResultsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/results" element={<ResultsPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

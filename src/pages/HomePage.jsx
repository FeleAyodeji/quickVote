import { useEffect, useState } from 'react';
import { getCategories } from '../services/storage';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [categories, setCategoriesList] = useState([]);

  useEffect(() => {
    const categories = getCategories();
    setCategoriesList(categories);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          Voting Categories
        </h1>
        <ul className="space-y-6">
          {categories.map((category) => (
            <li
              key={category.id}
              className="bg-gradient-to-r from-indigo-100 to-indigo-200 p-6 rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Link
                to={`/category/${category.id}`}
                className="text-2xl font-semibold text-indigo-800 hover:text-indigo-600 transition-colors duration-300"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Link
            to="/results"
            className="px-8 py-3 bg-indigo-600 text-white text-lg rounded-full hover:bg-indigo-700 transition-all duration-300"
          >
            View Results
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
